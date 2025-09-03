'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Theme } from './enum';

type Props = {
  children?: ReactNode;
  defaultTheme?: Theme;
  forcedTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

export const NextThemeProvider: React.FC<Props> = ({
  children,
  defaultTheme = Theme.Light,
  forcedTheme,
  enableSystem = true,
  disableTransitionOnChange = true,
}) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
};
