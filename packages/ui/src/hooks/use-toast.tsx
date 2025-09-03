import {
  AlertTriangleIcon,
  CheckIcon,
  InfoIcon,
  Loader2Icon,
} from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from './use-mobile';

export const useToast = () => {
  const isMobile = useIsMobile();
  const toastLoading = (
    message: string,
    options?: Parameters<typeof toast.info>[1],
  ) => {
    toast.info(message, {
      icon: <Loader2Icon className="size-4 animate-spin" />,
      position: isMobile ? 'top-center' : 'bottom-right',
      ...options,
    });
  };

  const toastSuccess = (
    message: string,
    options?: Parameters<typeof toast.success>[1],
  ) => {
    toast.success(message, {
      icon: <CheckIcon className="size-4 text-green-500" />,
      position: isMobile ? 'top-center' : 'bottom-right',
      ...options,
    });
  };

  const toastError = (
    message: string,
    options?: Parameters<typeof toast.error>[1],
  ) => {
    toast.error(message, {
      icon: <InfoIcon className="size-4 text-red-500" />,
      position: isMobile ? 'top-center' : 'bottom-right',
      ...options,
    });
  };

  const toastInfo = (
    message: string,
    options?: Parameters<typeof toast.info>[1],
  ) => {
    toast.info(message, {
      icon: <InfoIcon className="size-4 text-blue-500" />,
      position: isMobile ? 'top-center' : 'bottom-right',
      ...options,
    });
  };

  const toastWarning = (
    message: string,
    options?: Parameters<typeof toast.warning>[1],
  ) => {
    toast.warning(message, {
      icon: <AlertTriangleIcon className="size-4 text-yellow-500" />,
      position: isMobile ? 'top-center' : 'bottom-right',
      ...options,
    });
  };

  const toastDismiss = (id?: string) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  };

  return {
    toastLoading,
    toastSuccess,
    toastError,
    toastInfo,
    toastWarning,
    toastDismiss,
  };
};
