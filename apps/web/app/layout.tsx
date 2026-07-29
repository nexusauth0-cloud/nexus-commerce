import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'NEXUS Commerce — The Next Generation AI Commerce Platform',
    template: '%s | NEXUS Commerce',
  },
  description:
    'Experience the future of shopping with AI-powered recommendations, intelligent search, and seamless checkout. NEXUS Commerce redefines how you discover and purchase products.',
  keywords: ['ecommerce', 'AI shopping', 'online store', 'nexus commerce', 'headless commerce'],
  authors: [{ name: 'NEXUS Commerce' }],
  creator: 'NEXUS Commerce',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexus-commerce.com',
    siteName: 'NEXUS Commerce',
    title: 'NEXUS Commerce — The Next Generation AI Commerce Platform',
    description:
      'Experience the future of shopping with AI-powered recommendations and intelligent search.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEXUS Commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS Commerce — The Next Generation AI Commerce Platform',
    description:
      'Experience the future of shopping with AI-powered recommendations and intelligent search.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background text-text-primary min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
