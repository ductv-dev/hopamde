// app/react-query-provider.tsx
'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@workspace/ui-providers';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
