import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SocialPro | Social Media Management Platform',
  description: 'Comprehensive social media management platform for professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
              <Header />
              <main className="relative flex-1 overflow-y-auto focus:outline-none">
                <div className="py-6">
                  <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}