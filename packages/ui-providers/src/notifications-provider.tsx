'use client';

import type {
  NotificationPermission,
  NotificationToken,
} from './notifications-utils';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getNotificationService } from './notifications-utils';

type NotificationsContextType = {
  // State
  permission: NotificationPermission;
  token: NotificationToken;
  isSupported: boolean;
  isLoading: boolean;

  // Actions
  requestPermission: () => Promise<NotificationPermission>;
  getToken: () => Promise<NotificationToken>;
  deleteToken: () => Promise<void>;
  showLocalNotification: (
    title: string,
    options?: NotificationOptions,
  ) => Notification | null;
  registerServiceWorker: () => Promise<ServiceWorkerRegistration | null>;
};

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

type Props = {
  children?: React.ReactNode;
  autoRequestPermission?: boolean;
  onTokenReceived?: (token: string) => void;
  onPermissionChange?: (permission: NotificationPermission) => void;
  onMessage?: (payload: any) => void;
};

export const NotificationsProvider: React.FC<Props> = ({
  children,
  autoRequestPermission = false,
  onTokenReceived,
  onPermissionChange,
  onMessage,
}) => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: false,
  });
  const [token, setToken] = useState<NotificationToken>({ token: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported] = useState(() => getNotificationService().isSupported());
  const messageListenerRef = useRef<(() => void) | null>(null);

  // Initialize permission status
  useEffect(() => {
    if (isSupported) {
      const currentPermission = getNotificationService().getPermissionStatus();
      setPermission(currentPermission);
      onPermissionChange?.(currentPermission);
    }
  }, [isSupported, onPermissionChange]);

  // Register service worker on mount
  useEffect(() => {
    if (isSupported) {
      getNotificationService().registerServiceWorker().catch(console.error);
    }
  }, [isSupported]);

  // Set up message listener
  useEffect(() => {
    if (isSupported && onMessage) {
      // Clean up previous listener
      if (messageListenerRef.current) {
        messageListenerRef.current();
        messageListenerRef.current = null;
      }

      // Set up new listener
      const unsubscribe = getNotificationService().onMessage(onMessage);
      messageListenerRef.current = unsubscribe;

      return () => {
        if (messageListenerRef.current) {
          messageListenerRef.current();
          messageListenerRef.current = null;
        }
      };
    }
  }, [isSupported, onMessage]);

  const requestPermission =
    useCallback(async (): Promise<NotificationPermission> => {
      if (!isSupported) {
        throw new Error('Notifications not supported');
      }

      setIsLoading(true);
      try {
        const newPermission =
          await getNotificationService().requestPermission();
        setPermission(newPermission);
        onPermissionChange?.(newPermission);
        return newPermission;
      } catch (error) {
        console.error('Error requesting permission:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }, [isSupported, onPermissionChange]);

  const getToken = useCallback(async (): Promise<NotificationToken> => {
    if (!isSupported) {
      throw new Error('Notifications not supported');
    }

    if (!permission.granted) {
      throw new Error('Permission not granted');
    }

    setIsLoading(true);
    try {
      const newToken = await getNotificationService().getToken();
      setToken(newToken);

      if (newToken.token) {
        onTokenReceived?.(newToken.token);
      }

      return newToken;
    } catch (error) {
      console.error('Error getting token:', error);
      const errorToken = {
        token: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      setToken(errorToken);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission.granted, onTokenReceived]);

  const deleteToken = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      throw new Error('Notifications not supported');
    }

    setIsLoading(true);
    try {
      await getNotificationService().deleteToken();
      setToken({ token: null });
    } catch (error) {
      console.error('Error deleting token:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  const showLocalNotification = useCallback(
    (title: string, options?: NotificationOptions): Notification | null => {
      if (!isSupported) {
        console.warn('Notifications not supported');
        return null;
      }

      return getNotificationService().showLocalNotification(title, options);
    },
    [isSupported],
  );

  const registerServiceWorker =
    useCallback(async (): Promise<ServiceWorkerRegistration | null> => {
      if (!isSupported) {
        console.warn('Service Worker not supported');
        return null;
      }

      return getNotificationService().registerServiceWorker();
    }, [isSupported]);

  // Auto request permission if enabled
  useEffect(() => {
    if (autoRequestPermission && isSupported && permission.default) {
      requestPermission();
    }
  }, [
    autoRequestPermission,
    isSupported,
    permission.default,
    requestPermission,
  ]);

  // Get token when permission is granted
  useEffect(() => {
    if (permission.granted && isSupported) {
      getToken();
    }
  }, [permission.granted, isSupported, getToken]);

  const contextValue: NotificationsContextType = {
    permission,
    token,
    isSupported,
    isLoading,
    requestPermission,
    getToken,
    deleteToken,
    showLocalNotification,
    registerServiceWorker,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook to use notifications context
export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider',
    );
  }
  return context;
};

// Hook for simple notification permission request
export const useNotificationPermission = () => {
  const { permission, requestPermission, isSupported } = useNotifications();

  return {
    permission,
    requestPermission,
    isSupported,
    isGranted: permission.granted,
    isDenied: permission.denied,
    isDefault: permission.default,
  };
};

// Hook for FCM token management
export const useNotificationToken = () => {
  const { token, getToken, deleteToken, isLoading } = useNotifications();

  return {
    token: token.token,
    error: token.error,
    getToken,
    deleteToken,
    isLoading,
  };
};
