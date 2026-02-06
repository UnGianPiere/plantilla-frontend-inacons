/**
 * 🎣 HOOKS - LÓGICA DE DATOS Y ESTADO
 *
 * Responsabilidad: Centralizar custom hooks para manejo de datos
 * Flujo: Importado por componentes → Conecta con GraphQL/Backend
 *
 * Contiene:
 * - useAuth: Autenticación y usuario (viene de context)
 * - [Futuro] useActivos: Gestión de activos fijos
 * - [Futuro] useCategorias: Categorías de activos
 */

// Hooks de autenticación (viene del context)
export { useAuth } from '@/context/auth-context';

// Hooks de conectividad
export {
  useOnline,
  useIsOnline,
  useRequireOnline,
} from './use-online';

// [Futuro] Exportar hooks de negocio aquí
// export { useActivos } from './useActivos';
// export { useCategorias } from './useCategorias';
