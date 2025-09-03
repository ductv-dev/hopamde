'use client';

import { useEffect } from 'react';
import { NotificationPermissionButton } from './notification-permission-button';
import {
  NotificationsProvider,
  useNotificationPermission,
  useNotificationToken,
} from './notifications-provider';

// Example component that uses the notification system
export const NotificationDemo: React.FC = () => {
  const { permission, isSupported } = useNotificationPermission();
  const { token, error, isLoading } = useNotificationToken();

  useEffect(() => {
    console.log('--------------------------------------------------------');
    console.log('TEST');
    console.log(
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_APP_ID',
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_VAPID_KEY',
      process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    );
    console.log('--------------------------------------------------------');
  }, []);

  if (!isSupported) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h3 className="mb-2 text-lg font-semibold text-yellow-800">
          Notifications Not Supported
        </h3>
        <p className="text-yellow-700">
          Your browser doesn&apos;t support web push notifications. Please use a
          modern browser like Chrome, Firefox, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-lg bg-white p-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Web Push Notifications Demo
        </h2>

        {/* Permission Status */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-900">
            Permission Status
          </h3>
          <div className="flex items-center gap-4">
            <NotificationPermissionButton
              onPermissionGranted={() => console.log('Permission granted!')}
              onPermissionDenied={() => console.log('Permission denied!')}
            />
            <div className="text-sm text-gray-600">
              Status:{' '}
              {permission.granted
                ? 'Granted'
                : permission.denied
                  ? 'Denied'
                  : 'Default'}
            </div>
          </div>
        </div>

        {/* Token Information */}
        {permission.granted && (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              FCM Token
            </h3>
            <div className="space-y-2">
              {isLoading ? (
                <div className="text-sm text-gray-600">Loading token...</div>
              ) : token ? (
                <div>
                  <div className="mb-2 text-sm text-gray-600">Token:</div>
                  <code className="block break-all rounded bg-gray-100 p-3 text-xs">
                    {token}
                  </code>
                </div>
              ) : error ? (
                <div className="text-sm text-red-600">Error: {error}</div>
              ) : (
                <div className="text-sm text-gray-600">No token available</div>
              )}
            </div>
          </div>
        )}

        {/* Usage Instructions */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-medium text-blue-900">How to Use</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              1. Click &quot;Enable Notifications&quot; to request permission
            </p>
            <p>
              2. Once granted, you&apos;ll receive an FCM token that can be sent
              to your backend
            </p>
            <p>3. Use the token to send push notifications from your server</p>
            <p>4. Test local notifications using the demo above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides the notification context
export const NotificationExample: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }
  }, []);
  return (
    <NotificationsProvider
      autoRequestPermission={false}
      onTokenReceived={(token) => {
        console.log('Token received:', token);
        // Send this token to your backend
      }}
      onPermissionChange={(permission) => {
        console.log('Permission changed:', permission);
      }}
      onMessage={(payload) => {
        console.log('Foreground message received:', payload);
        // Handle foreground messages here
      }}
    >
      <NotificationDemo />
    </NotificationsProvider>
  );
};
