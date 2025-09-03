# Firebase Web Push Notifications

A comprehensive web push notification system using Firebase Cloud Messaging (FCM) for Next.js applications.

## Features

- 🔔 Request notification permissions with a beautiful UI
- 🎯 Get FCM tokens for server-side push notifications
- 📱 Handle foreground and background messages
- 🎨 Customizable notification UI components
- 🔧 Easy-to-use React hooks
- 🛡️ TypeScript support
- 🎯 Service worker for background notifications

## Setup

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Cloud Messaging in the project settings
4. Generate a VAPID key pair:
   - Go to Project Settings > Cloud Messaging
   - Scroll down to "Web configuration"
   - Generate a new key pair
   - Copy the public key

### 2. Update VAPID Key

Replace `YOUR_VAPID_KEY_HERE` in `notifications-utils.ts` with your actual VAPID key:

```typescript
const VAPID_KEY = 'YOUR_ACTUAL_VAPID_KEY_HERE';
```

### 3. Service Worker

The service worker file `firebase-messaging-sw.js` should be placed in your `public` directory. Make sure it's accessible at the root path.

### 4. Firebase Configuration

Update the Firebase configuration in both `notifications-utils.ts` and `firebase-messaging-sw.js` with your project settings.

## Usage

### Basic Setup

Wrap your app with the `NotificationsProvider`:

```tsx
import { NotificationsProvider } from '@your-org/ui-providers';

function App() {
  return (
    <NotificationsProvider
      autoRequestPermission={false}
      onTokenReceived={(token) => {
        // Send token to your backend
        console.log('FCM Token:', token);
      }}
      onMessage={(payload) => {
        // Handle foreground messages
        console.log('Message received:', payload);
      }}
    >
      <YourApp />
    </NotificationsProvider>
  );
}
```

### Request Permission

Use the `NotificationPermissionButton` component:

```tsx
import { NotificationPermissionButton } from '@your-org/ui-providers';

function MyComponent() {
  return (
    <NotificationPermissionButton
      variant="default"
      onPermissionGranted={() => console.log('Permission granted!')}
      onPermissionDenied={() => console.log('Permission denied!')}
    >
      Enable Notifications
    </NotificationPermissionButton>
  );
}
```

### Using Hooks

```tsx
import {
  useNotificationPermission,
  useNotifications,
  useNotificationToken,
} from '@your-org/ui-providers';

function NotificationComponent() {
  const { permission, requestPermission, isGranted } =
    useNotificationPermission();
  const { token, getToken } = useNotificationToken();
  const { showLocalNotification } = useNotifications();

  const handleEnableNotifications = async () => {
    await requestPermission();
    if (isGranted) {
      const { token } = await getToken();
      // Send token to backend
    }
  };

  const handleShowNotification = () => {
    showLocalNotification('Hello!', {
      body: 'This is a local notification',
      icon: '/logo.svg',
    });
  };

  return (
    <div>
      <button onClick={handleEnableNotifications}>Enable Notifications</button>
      <button onClick={handleShowNotification}>Show Notification</button>
    </div>
  );
}
```

### Direct API Usage

```tsx
import {
  getNotificationToken,
  notificationService,
  requestNotificationPermission,
} from '@your-org/ui-providers';

// Request permission
const permission = await requestNotificationPermission();

// Get token
const { token } = await getNotificationToken();

// Show local notification
notificationService.showLocalNotification('Title', {
  body: 'Message body',
  icon: '/logo.svg',
});
```

## API Reference

### NotificationsProvider Props

| Prop                    | Type                                           | Default | Description                               |
| ----------------------- | ---------------------------------------------- | ------- | ----------------------------------------- |
| `autoRequestPermission` | `boolean`                                      | `false` | Automatically request permission on mount |
| `onTokenReceived`       | `(token: string) => void`                      | -       | Callback when FCM token is received       |
| `onPermissionChange`    | `(permission: NotificationPermission) => void` | -       | Callback when permission status changes   |
| `onMessage`             | `(payload: any) => void`                       | -       | Callback for foreground messages          |

### NotificationPermissionButton Props

| Prop                  | Type                                | Default     | Description                         |
| --------------------- | ----------------------------------- | ----------- | ----------------------------------- |
| `variant`             | `'default' \| 'outline' \| 'ghost'` | `'default'` | Button variant                      |
| `size`                | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Button size                         |
| `showStatus`          | `boolean`                           | `true`      | Show permission status              |
| `onPermissionGranted` | `() => void`                        | -           | Callback when permission is granted |
| `onPermissionDenied`  | `() => void`                        | -           | Callback when permission is denied  |

### Hooks

#### useNotificationPermission()

Returns permission status and request function.

#### useNotificationToken()

Returns FCM token and management functions.

#### useNotifications()

Returns all notification-related functions and state.

## Sending Push Notifications

### From Your Backend

Use the FCM token to send push notifications from your server:

```javascript
// Example using Firebase Admin SDK
const admin = require('firebase-admin');

const message = {
  notification: {
    title: 'Hello!',
    body: 'This is a push notification',
  },
  data: {
    url: '/dashboard',
    tag: 'welcome',
  },
  token: 'user_fcm_token_here',
};

admin.messaging().send(message);
```

### Message Format

```javascript
{
  notification: {
    title: 'Notification Title',
    body: 'Notification body text',
    icon: '/icon.png',
    image: '/image.jpg',
  },
  data: {
    url: '/redirect-url',
    tag: 'unique-tag',
    actions: JSON.stringify([
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ]),
    requireInteraction: 'true',
    silent: 'false',
  },
  token: 'fcm_token',
}
```

## Browser Support

- Chrome 42+
- Firefox 44+
- Safari 16+
- Edge 17+

## Troubleshooting

### Common Issues

1. **Service Worker Not Registered**: Ensure `firebase-messaging-sw.js` is in the public directory
2. **VAPID Key Error**: Verify your VAPID key is correct and matches your Firebase project
3. **Permission Denied**: Users must manually enable notifications in browser settings
4. **HTTPS Required**: Push notifications require HTTPS in production

### Debug Mode

Enable debug logging:

```typescript
// In your app
const { notificationService } = useNotifications();
console.log('Permission:', notificationService.getPermissionStatus());
console.log('Supported:', notificationService.isSupported());
```

## License

MIT
