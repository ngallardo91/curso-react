import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * 🏗️ SETUP DE TANSTACK QUERY - Configuración Principal
 * 
 * Este archivo configura TanStack Query para toda la aplicación.
 * Hay 3 piezas clave que necesitas entender:
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ QueryClient - El "Cerebro" de TanStack Query
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * QueryClient es el gestor principal que:
 * - Mantiene el CACHÉ de todas las queries
 * - Gestiona el estado de queries y mutations
 * - Controla la configuración global (opciones por defecto)
 * - Permite invalidar, prefetch, y manipular queries manualmente
 * 
 * Es como el "Redux Store" de TanStack Query, pero mucho más simple.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    // ⚙️ Opciones por defecto para TODAS las queries de la app
    queries: {
      staleTime: 5000,              // Datos "fresh" durante 5 segundos
      refetchOnWindowFocus: false,  // No refetch al volver a la pestaña
      // retry: 3,                  // Reintentos en caso de error
      // refetchOnMount: true,      // Refetch al montar componente
      // refetchOnReconnect: true,  // Refetch al reconectar internet
    },
    // Puedes configurar también opciones para mutations:
    // mutations: {
    //   retry: 1,
    // },
  },
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ QueryClientProvider - El "Proveedor" del Context
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * QueryClientProvider es un Context Provider de React que:
 * - Hace disponible el QueryClient en toda la app
 * - Permite que todos los componentes usen useQuery, useMutation, etc.
 * - Similar a Redux Provider, Router Provider, etc.
 * 
 * IMPORTANTE: Debe envolver toda tu app (o la parte que use queries)
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣ ReactQueryDevtools - Herramienta de Desarrollo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * ReactQueryDevtools es un panel de inspección que muestra:
 * - Todas las queries activas y su estado (fresh, stale, inactive)
 * - Datos en caché de cada query
 * - Mutaciones ejecutadas
 * - Permite invalidar queries manualmente
 * - Perfecto para debugging y aprendizaje
 * 
 * Solo aparece en desarrollo (no en producción)
 * initialIsOpen: false → Panel cerrado al inicio
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/* Toda tu app va aquí y puede usar TanStack Query */}
    <App />
    
    {/* DevTools flotante (solo desarrollo) */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
