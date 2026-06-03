import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://veniar.com'),
  title: {
    default: 'Veniar | Shared Rewards for Local Favorites',
    template: '%s | Veniar',
  },
  description:
    'Veniar is a shared rewards network for independent restaurants and local businesses, built by RewardsNow.',
  openGraph: {
    type: 'website',
    siteName: 'Veniar',
    url: 'https://veniar.com',
    title: 'Veniar | Shared Rewards for Local Favorites',
    description:
      'Veniar is a shared rewards network for independent restaurants and local businesses, built by RewardsNow.',
  },
  twitter: {
    card: 'summary',
    title: 'Veniar | Shared Rewards for Local Favorites',
    description: 'Earn Veniar Points at independent restaurants and local businesses.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-vn-ivory text-vn-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
