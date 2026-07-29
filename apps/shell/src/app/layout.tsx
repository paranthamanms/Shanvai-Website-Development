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
  applicationName: 'Shanvai Technologies',
  metadataBase: new URL('https://www.shanvai.com'),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'Shanvai Technologies',
    description:
      'Decision Core, Credit Bureau, and AIOps platforms for banks, NBFCs, and fintech institutions.',
    url: 'https://www.shanvai.com',
    siteName: 'Shanvai Technologies',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen max-w-[100%] overflow-x-clip bg-white font-body text-ink antialiased">
        <SiteHeader />
        <main className="min-w-0 overflow-x-clip">{children}</main>
        <SiteFooter />
        <ChatbotHost />
      </body>
    </html>
  );
}
