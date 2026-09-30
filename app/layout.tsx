import type { Metadata } from 'next';
import { Pixelify_Sans, Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/shared/Header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixelify'
});

export const metadata: Metadata = {
  title: 'LAJE',
  description: 'Liga Acadêmica de Jogos Eletrônicos'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelify.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
