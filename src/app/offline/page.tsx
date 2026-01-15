'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Icono de desconexión */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <WifiOff className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Título y mensaje */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Sin conexión a internet
        </h1>
        <p className="text-gray-600 mb-8">
          No se puede conectar al servidor. Verifica tu conexión a internet e intenta nuevamente.
        </p>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Algunas funciones pueden estar limitadas sin conexión.
            Los datos se sincronizarán automáticamente cuando recuperes la conexión.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Intentar nuevamente
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
        </div>

        {/* Información técnica */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sistema de Activos Fijos v0.1.0
          </p>
        </div>
      </div>
    </div>
  );
}
