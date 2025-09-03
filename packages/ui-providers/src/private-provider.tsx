'use client';

import { redirect } from 'next/navigation';
import { authClient } from '@workspace/ui-utils';

type Props = {
  children?: React.ReactNode;
};

export const PrivateProvider: React.FC<Props> = ({ children }) => {
  const { useSession } = authClient;
  const { data: session, isPending: isPendingSession } = useSession();

  if (!session && !isPendingSession) {
    redirect('/');
  }

  return children;
};
