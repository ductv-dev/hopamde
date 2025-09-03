'use client';

import { useMenu } from '@/hooks';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { menu } = useMenu();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="p-2 hover:bg-transparent"
            >
              <Link href="/">
                <img src="/logo-short.svg" alt="logo" className="block h-8" />
                <div className="flex flex-col gap-0.5 whitespace-nowrap leading-none">
                  <span className="text-xs font-semibold">IDEALABS.WORK</span>
                  <span className="text-muted-foreground text-xs">
                    Admin management system
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
