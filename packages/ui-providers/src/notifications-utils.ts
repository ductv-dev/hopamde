import { initializeApp } from 'firebase/app';
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// VAPID key - you need to get this from Firebase Console
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export type NotificationPermission = {
  granted: boolean;
  denied: boolean;
  default: boolean;
};

export type NotificationToken = {
  token: string | null;
  error?: string;
};

export class NotificationService {
  private messaging: any = null;

  constructor() {
    // Only initialize messaging on the client side
    if (typeof window !== 'undefined') {
      try {
        this.messaging = getMessaging(app);
      } catch (error) {
        console.warn('Failed to initialize Firebase messaging:', error);
      }
    }
  }

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot request permission on server side');
    }

    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
      return { granted: true, denied: false, default: false };
    }

    if (Notification.permission === 'denied') {
      return { granted: false, denied: true, default: false };
    }

    try {
      const permission = await Notification.requestPermission();
      return {
        granted: permission === 'granted',
        denied: permission === 'denied',
        default: permission === 'default',
      };
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  }

  /**
   * Get current notification permission status
   */
  getPermissionStatus(): NotificationPermission {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return { granted: false, denied: false, default: false };
    }

    return {
      granted: Notification.permission === 'granted',
      denied: Notification.permission === 'denied',
      default: Notification.permission === 'default',
    };
  }

  /**
   * Get FCM token for the current user
   */
  async getToken(): Promise<NotificationToken> {
    try {
      if (!this.messaging) {
        throw new Error('Firebase messaging not initialized');
      }

      const permission = this.getPermissionStatus();

      if (!permission.granted) {
        throw new Error('Notification permission not granted');
      }

      // Check if service worker is registered
      if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker not supported');
      }

      const registration = await navigator.serviceWorker.getRegistration(
        '/firebase-messaging-sw.js',
      );

      if (!registration) {
        throw new Error('Firebase messaging service worker not registered');
      }

      const token = await getToken(this.messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      return { token };
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return {
        token: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Delete FCM token
   */
  async deleteToken(): Promise<void> {
    try {
      if (!this.messaging) {
        throw new Error('Firebase messaging not initialized');
      }
      await deleteToken(this.messaging);
    } catch (error) {
      console.error('Error deleting FCM token:', error);
      throw error;
    }
  }

  /**
   * Subscribe to foreground messages
   */
  onMessage(callback: (payload: any) => void): () => void {
    if (!this.messaging) {
      console.warn('Firebase messaging not initialized');
      return () => {
        //
      }; // Return empty cleanup function
    }
    return onMessage(this.messaging, callback);
  }

  /**
   * Show a local notification
   */
  showLocalNotification(
    title: string,
    options?: NotificationOptions,
  ): Notification | null {
    if (
      typeof window === 'undefined' ||
      !('Notification' in window) ||
      Notification.permission !== 'granted'
    ) {
      return null;
    }

    const defaultOptions: NotificationOptions = {
      icon: '/logo.svg',
      badge: '/logo.svg',
      tag: 'local-notification',
      requireInteraction: false,
      silent: false,
      ...options,
    };

    // Close any existing notifications with the same tag to prevent duplicates
    if (defaultOptions.tag) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.getNotifications().then((notifications) => {
            notifications.forEach((notification) => {
              if (notification.tag === defaultOptions.tag) {
                notification.close();
              }
            });
          });
        });
      });
    }

    return new Notification(title, defaultOptions);
  }

  /**
   * Check if the browser supports notifications
   */
  isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator &&
      this.messaging !== null
    );
  }

  /**
   * Register the service worker
   */
  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return null;
    }

    // Prevent multiple registrations
    if (_serviceWorkerRegistered) {
      console.log('Service worker registration already in progress');
      const existing = await navigator.serviceWorker.getRegistration(
        '/firebase-messaging-sw.js',
      );
      return existing || null;
    }

    try {
      _serviceWorkerRegistered = true;

      // Check if service worker is already registered
      const existingRegistration =
        await navigator.serviceWorker.getRegistration(
          '/firebase-messaging-sw.js',
        );
      if (existingRegistration) {
        console.log('Firebase messaging service worker already registered');
        return existingRegistration;
      }

      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
        {
          scope: '/',
        },
      );

      console.log(
        'Firebase messaging service worker registered:',
        registration,
      );
      return registration;
    } catch (error) {
      console.error('Error registering service worker:', error);
      _serviceWorkerRegistered = false;
      return null;
    }
  }
}

// Create a lazy singleton instance
let _notificationService: NotificationService | null = null;
let _serviceWorkerRegistered = false;

export const getNotificationService = (): NotificationService => {
  if (!_notificationService) {
    _notificationService = new NotificationService();
  }
  return _notificationService;
};

export const notificationService = getNotificationService();

// Export utility functions for easier usage
export const requestNotificationPermission = () =>
  getNotificationService().requestPermission();
export const getNotificationToken = () => getNotificationService().getToken();
export const deleteNotificationToken = () =>
  getNotificationService().deleteToken();
export const showLocalNotification = (
  title: string,
  options?: NotificationOptions,
) => getNotificationService().showLocalNotification(title, options);
export const isNotificationSupported = () =>
  getNotificationService().isSupported();
