/**
 * Componente para mostrar banner cuando la aplicación está offline
 * Proporciona información clara sobre el estado de conexión
 */

'use client';

import React from 'react';
import { WifiOff, Wifi, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnline } from '@/hooks';

interface OfflineBannerProps {
  className?: string;
  showRetryButton?: boolean;
  compact?: boolean;
}

export function OfflineBanner({
  className,
  showRetryButton = true,
  compact = false
}: OfflineBannerProps) {
  const { status, latency, checkConnection, lastOfflineAt } = useOnline();

  // Solo mostrar si está offline
  const isOffline = status === 'offline';
  const isSlow = status === 'slow';
  const isUnstable = status === 'unstable';

  if (!isOffline && !isSlow && !isUnstable) {
    return null;
  }

  // Determinar colores e iconos según el estado
  const getStatusConfig = () => {
    if (isOffline) {
      return {
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        icon: WifiOff,
        title: 'Sin conexión',
        message: 'No hay conexión a internet. Algunas funciones están limitadas.',
      };
    }

    if (isSlow) {
      return {
        bgColor: 'bg-yellow-500',
        textColor: 'text-white',
        icon: AlertTriangle,
        title: 'Conexión lenta',
        message: `Conexión lenta detectada (${latency}ms). El rendimiento puede verse afectado.`,
      };
    }

    if (isUnstable) {
      return {
        bgColor: 'bg-orange-500',
        textColor: 'text-white',
        icon: Wifi,
        title: 'Conexión inestable',
        message: 'La conexión es inestable. Puede haber interrupciones en el servicio.',
      };
    }

    return null;
  };

  const config = getStatusConfig();
  if (!config) return null;

  const Icon = config.icon;

  // Calcular tiempo offline si aplica
  const getOfflineTime = () => {
    if (!lastOfflineAt) return null;
    const minutes = Math.floor((Date.now() - lastOfflineAt) / (1000 * 60));
    if (minutes < 1) return 'recién';
    if (minutes < 60) return `${minutes} minutos`;
    const hours = Math.floor(minutes / 60);
    return `${hours} horas`;
  };

  if (compact) {
    // Versión compacta para header o espacios reducidos
    return (
      <div className={`px-3 py-2 ${config.bgColor} ${className}`}>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Icon className="w-4 h-4" />
          <span className="font-medium">{config.title}</span>
          {isOffline && lastOfflineAt && (
            <span className="opacity-90">desde {getOfflineTime()}</span>
          )}
        </div>
      </div>
    );
  }

  // Versión completa
  return (
    <div className={`${config.bgColor} px-4 py-3 shadow-lg ${className}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">
              {config.title}
              {isOffline && lastOfflineAt && (
                <span className="ml-2 opacity-90">
                  (desde {getOfflineTime()})
                </span>
              )}
            </p>
            <p className="text-sm opacity-90">
              {config.message}
            </p>
          </div>
        </div>

        {showRetryButton && (
          <Button
            onClick={() => checkConnection()}
            size="sm"
            variant="outline"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Hook para usar el banner offline en cualquier componente
 */
export function useOfflineBanner() {
  const { status } = useOnline();

  const shouldShow = status === 'offline' || status === 'slow' || status === 'unstable';

  return {
    shouldShow,
    status,
  };
}

/**
 * Componente wrapper que muestra el banner automáticamente
 * Útil para layouts globales
 */
export function GlobalOfflineBanner({ compact = false }: { compact?: boolean }) {
  const { shouldShow } = useOfflineBanner();

  if (!shouldShow) {
    return null;
  }

  return <OfflineBanner compact={compact} />;
}

/**
 * Badge pequeño para mostrar estado de conexión
 */
export function ConnectionBadge() {
  const { status, latency } = useOnline();

  const getBadgeConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-green-500',
          text: 'Online',
          icon: Wifi,
        };
      case 'slow':
        return {
          color: 'bg-yellow-500',
          text: `${latency}ms`,
          icon: AlertTriangle,
        };
      case 'unstable':
        return {
          color: 'bg-orange-500',
          text: 'Inestable',
          icon: Wifi,
        };
      case 'offline':
        return {
          color: 'bg-red-500',
          text: 'Offline',
          icon: WifiOff,
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${config.color}`}>
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </div>
  );
}
