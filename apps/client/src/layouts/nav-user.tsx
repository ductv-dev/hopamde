'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@workspace/ui-utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@workspace/ui/components/sidebar';
import { Skeleton } from '@workspace/ui/components/skeleton';

export const NavUser = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserInfo />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

type UserInfoProps = object;

export const UserInfo: React.FC<UserInfoProps> = () => {
  const { isMobile } = useSidebar();
  const { signOut } = authClient;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserAvatar hasArrow />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
            router.push('/auth/sign-in');
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type UserAvatarProps = {
  hasArrow?: boolean;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ hasArrow }) => {
  const { useSession } = authClient;
  const { data: session, isPending: isPendingSession } = useSession();

  return (
    <>
      {isPendingSession ? (
        <>
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-3 w-10 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>
        </>
      ) : (
        <>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={session?.user?.image ?? ''}
              alt={session?.user?.name ?? ''}
            />
            <AvatarFallback className="rounded-lg">
              {session?.user?.name?.split('')?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {session?.user?.name}
            </span>
            <span className="truncate text-xs">{session?.user?.email}</span>
          </div>
        </>
      )}
      {hasArrow && <ChevronsUpDown className="ml-auto size-4" />}
    </>
  );
};
