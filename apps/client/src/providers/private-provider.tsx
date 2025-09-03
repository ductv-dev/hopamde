'use client';

import { redirect } from 'next/navigation';
import { authClient } from '@workspace/ui-utils';
import { NotPermission } from '@workspace/ui/components/page-error';

export enum Role {
  User = 'user',
  Admin = 'admin',
  Collaborator = 'collaborator',
}

type Props = {
  children?: React.ReactNode;
  redirectUrl?: string;
  permission: ('admin' | 'collaborator' | 'user')[];
};

export const PrivateProvider: React.FC<Props> = ({
  children,
  redirectUrl,
  permission,
}) => {
  const { useSession } = authClient;
  const { data: session, isPending: isPendingSession } = useSession();
  const role = session?.user?.role;

  if (!session && !isPendingSession) {
    return redirect(redirectUrl ?? '/auth/sign-in');
  }

  if (role && !permission?.includes(role as Role)) {
    return (
      <>
        <NotPermission redirectUrl="/auth/sign-in" />
      </>
    );
  }

  return !isPendingSession && children;
};
