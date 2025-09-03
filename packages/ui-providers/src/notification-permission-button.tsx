'use client';

import React, { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { useNotificationPermission } from './notifications-provider';

type NotificationPermissionButtonProps = {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
  showStatus?: boolean;
};

export const NotificationPermissionButton: React.FC<
  NotificationPermissionButtonProps
> = ({ onPermissionGranted, onPermissionDenied, showStatus = true }) => {
  const { requestPermission, isSupported, isGranted, isDenied } =
    useNotificationPermission();
  const [isRequesting, setIsRequesting] = useState(false);

  if (!isSupported) {
    return null; // Don't render if notifications are not supported
  }

  if (isGranted) {
    return showStatus ? (
      <div className="inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-600">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Notifications enabled</span>
      </div>
    ) : null;
  }

  if (isDenied) {
    return showStatus ? (
      <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span>Notifications blocked</span>
      </div>
    ) : null;
  }

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const result = await requestPermission();
      if (result.granted) {
        onPermissionGranted?.();
      } else {
        onPermissionDenied?.();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      onPermissionDenied?.();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleRequestPermission}
      disabled={isRequesting}
    >
      Request Permission
    </Button>
  );
};
