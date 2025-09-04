'use client';

import type { LucideIcon } from 'lucide-react';
import { useMenu } from '@/app/hooks';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@workspace/ui-utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@workspace/ui/components/sidebar';
import { cn } from '@workspace/ui/lib/utils';

type Props = {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    permission: string[];
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

export const NavMain: React.FC<Props> = ({ items }) => {
  const { isActive } = useMenu();
  const { useSession } = authClient;
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="select-none">Creators</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(
          (item) =>
            item.permission.includes(role as string) && (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      isActive?.url === item?.url
                        ? 'bg-sidebar-accent font-medium'
                        : '',
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
