'use client';

import {
  SidebarInset,
  SidebarProvider,
} from '@workspace/ui/components/sidebar';
import { AppSidebar } from './app-sidebar';
import { Header } from './header';

type Props = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const Layout: React.FC<Props> = ({ children, defaultOpen }) => {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Header />
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

type BlankLayoutProps = {
  children: React.ReactNode;
};

export const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <>{children}</>;
};
