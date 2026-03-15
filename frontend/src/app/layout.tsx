import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import ThemeToggle from '@/components/ThemeToggle';
import { NotificationProvider } from '@/context/NotificationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Study Assistant Dashboard',
  description: 'Manage your studies, track progress, and summarize notes with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950`}>
        <NotificationProvider>
          <Providers>
            {children}
            <ThemeToggle />
          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
