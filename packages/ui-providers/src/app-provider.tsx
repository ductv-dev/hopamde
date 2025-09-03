'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { Toaster } from '@workspace/ui/components/sonner';
import { TourProvider } from '@workspace/ui/components/tour';

type Props = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <TourProvider>{children}</TourProvider>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
};
