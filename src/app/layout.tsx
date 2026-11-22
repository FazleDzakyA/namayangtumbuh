import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Lora, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import PwaRegister from '@/components/PwaRegister';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nama yang Tumbuh Bersama Waktu | Fazaa',
  description: 'Fazaa — Dari Sebuah Nama, Menjadi Sebuah Kisah. Arsip digital autobiografi karya Fazle & Azalia.',
  authors: [{ name: 'Fazle' }],
  keywords: ['Fazaa', 'Nama yang Tumbuh Bersama Waktu', 'Novel Digital', 'Literary Novel', 'Kisah Nyata', 'Azalia'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fazaa',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F0E8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${lora.variable} ${jakarta.variable} ${caveat.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-lora selection:bg-[#A8B5A0] selection:text-[#F5F0E8]">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
