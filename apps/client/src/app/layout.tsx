import { AppProvider, NextThemeProvider, Theme } from '@workspace/ui-providers';
import '@workspace/ui/globals.css';
import './styles.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Footer } from '../components/footer';
import { TheHeader } from '../components/the-header';
import ReactQueryProvider from './providers';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hợp Âm</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <ReactQueryProvider>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <AppProvider>
            <NextThemeProvider forcedTheme={Theme.Light}>
              <Suspense fallback={''}>
                <TheHeader />

                {children}
                <Footer />
              </Suspense>
            </NextThemeProvider>
          </AppProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
