import { AppProvider, NextThemeProvider, Theme } from '@workspace/ui-providers';
import '@workspace/ui/globals.css';
import { Inter } from 'next/font/google';

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
        <title>IDEA LABS WORK</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <AppProvider>
          <NextThemeProvider forcedTheme={Theme.Light}>
            {children}
          </NextThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
