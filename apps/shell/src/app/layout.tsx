import type { Metadata } from 'next';
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ChatbotHost } from '@/components/ChatbotHost';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Shanvai Technologies | Decision Intelligence for BFSI',
  description:
    'Shanvai Technologies builds Decision Core, Credit Bureau, and AIOps platforms for banks, NBFCs, and fintech institutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-white font-body text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ChatbotHost />
      </body>
    </html>
  );
}
