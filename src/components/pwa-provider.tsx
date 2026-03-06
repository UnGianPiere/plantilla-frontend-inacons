/**
 * Provider PWA que registra el Service Worker y proporciona componentes globales
 * Debe ser cliente porque maneja registro del SW y estado
 */

'use client';

import React, { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa';
import { GlobalOfflineBanner } from '@/components/offline-banner';
import { UpdateToast } from '@/components/update-toast';

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  useEffect(() => {
    // Registrar Service Worker al montar la aplicación
    const registerSW = async () => {
      try {
        const result = await registerServiceWorker();

        if (result.success) {
          console.log('[PWA] Service Worker registered successfully');
        } else {
          console.warn('[PWA] Service Worker registration failed:', result.error);
        }
      } catch (error) {
        console.error('[PWA] Unexpected error registering SW:', error);
      }
    };

    // Registrar siempre en localhost/desarrollo, solo producción en otros entornos
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Permitir registro en desarrollo para testing
      registerSW();
    }
  }, []);

  return (
    <>
      {/* Banner global de conexión offline */}
      <GlobalOfflineBanner />

      {/* Toast de actualización de SW */}
      <UpdateToast />

      {/* Contenido principal */}
      {children}
    </>
  );
}
