import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/providers/providers';
import { PWAProvider } from '@/components/pwa-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Activos Fijos - Sistema de Gestión',
  description: 'Sistema completo para la gestión de activos fijos',
  manifest: '/manifest.json',
  themeColor: '#1f2937',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <PWAProvider>
            {children}
          </PWAProvider>
        </Providers>
      </body>
    </html>
  );
}