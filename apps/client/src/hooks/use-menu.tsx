import { find } from 'es-toolkit/compat';
import {
  Link2Icon,
  ShoppingBagIcon,
  UserCheckIcon,
  UserLockIcon,
  UserSearchIcon,
  UsersIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation.js';
import { useMemo } from 'react';

export const useMenu = () => {
  const pathname = usePathname();

  const menu = {
    navMain: [
      {
        title: 'Manage Creators',
        url: '/',
        icon: UserCheckIcon,
        permission: ['admin', 'collaborator'],
      },
      {
        title: 'Manage Draft Creators',
        url: '/manage-draft-creators',
        icon: UserLockIcon,
        permission: ['admin', 'collaborator'],
      },
      {
        title: 'Products Request',
        url: '/products-request',
        icon: ShoppingBagIcon,
        permission: ['admin', 'collaborator'],
      },
      {
        title: 'Manage Shorten Link',
        url: '/manage-shorten-link',
        icon: Link2Icon,
        permission: ['admin'],
      },
      {
        title: 'Creators Finding',
        url: '/creators-finding',
        icon: UserSearchIcon,
        permission: ['admin'],
      },
      {
        title: 'Manage Users',
        url: '/manage-users',
        icon: UsersIcon,
        permission: ['admin'],
      },
    ],
  };

  const isActive = useMemo(() => {
    return find(menu.navMain, (item) =>
      item.url !== '/' ? pathname.includes(item.url) : item.url === pathname,
    );
  }, [pathname, menu.navMain]);

  return {
    menu,
    isActive,
  };
};
