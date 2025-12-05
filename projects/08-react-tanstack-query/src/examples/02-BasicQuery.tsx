import { useQuery } from "@tanstack/react-query";

/**
 * 📚 EJEMPLO 2: useQuery BÁSICO (Primer contacto con TanStack Query)
 * 
 * Este ejemplo muestra las VENTAJAS de usar TanStack Query:
 * ✅ Menos código (3 estados → 1 hook)
 * ✅ Caché automática
 * ✅ Revalidación automática (refetch inteligente)
 * ✅ Estados integrados (loading, error, data)
 * ✅ Retry automático en caso de error
 * 
 * 🔄 ¿Qué es la REVALIDACIÓN?
 * Es cuando TanStack Query verifica si los datos en caché siguen siendo válidos
 * y automáticamente hace un nuevo fetch si es necesario.
 * 
 * Casos de revalidación automática:
 * 1. Al volver a la pestaña del navegador (refetchOnWindowFocus: true)
 * 2. Al reconectar internet (refetchOnReconnect: true)
 * 3. Cuando el componente se monta y los datos están "stale" (viejos)
 * 4. Al invalidar manualmente con queryClient.invalidateQueries()
 * 
 * Esto mantiene los datos siempre actualizados sin código extra.
 */

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 1️⃣ Definimos la función que hace el fetch
// Esta función debe devolver una Promise
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=40000"
  );
  
  if (!response.ok) {
    throw new Error("Error al cargar posts");
  }
  
  return response.json();
}

export default function BasicQuery() {
  // 2️⃣ useQuery: el hook principal de TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    // queryKey: identificador único de esta query
    // Se usa para caché, invalidación y sincronización
    queryKey: ["posts"],
    
    // queryFn: la función que obtiene los datos
    queryFn: fetchPosts,
    
    // ⚡ OPCIONES DE REVALIDACIÓN (controlan cuándo hacer refetch):
    
    // staleTime: Tiempo que los datos se consideran "frescos"
    // Por defecto es 0, por eso ves fetch cada vez que se renderiza
    // staleTime: 5000, // 5 segundos - los datos son "fresh" durante este tiempo
    // staleTime: 0,         // Default: datos siempre "stale" → refetch cada vez
    // staleTime: Infinity,  // Nunca stale → solo fetch una vez (hasta invalidar)
    
    // refetchOnMount: Refetch al montar el componente (solo si datos están stale)
    // refetchOnMount: true,  // ✅ Default: true
    
    // refetchOnWindowFocus: Refetch al volver a la pestaña (solo si datos están stale)
    // refetchOnWindowFocus: true,  // ✅ Default: true
    
    // refetchOnReconnect: Refetch al reconectar internet
    // refetchOnReconnect: true,    // ✅ Default: true
    
    // retry: Intentos en caso de error
    retry: 3,
  });

  // 3️⃣ Manejo de estados - mucho más simple que el ejemplo anterior
  if (isLoading) {
    return <div style={styles.container}>
      <h2>⚡ useQuery Básico (Con TanStack Query)</h2>
      <p>⏳ Cargando posts...</p>
    </div>;
  }

  if (isError) {
    return <div style={styles.container}>
      <h2>⚡ useQuery Básico (Con TanStack Query)</h2>
      <p style={{ color: "red" }}>❌ Error: {error.message}</p>
    </div>;
  }

  // 4️⃣ En este punto, TypeScript sabe que 'data' existe
  return (
    <div style={styles.container}>
      <h2>⚡ useQuery Básico (Con TanStack Query)</h2>
      
      <div style={styles.benefitsBox}>
        <h3>✅ Ventajas de useQuery:</h3>
        <ul>
          <li><strong>Menos código:</strong> Un solo hook vs 3 estados</li>
          <li><strong>Caché automática:</strong> Los datos se guardan en memoria</li>
          <li><strong>Revalidación automática:</strong> Actualiza datos al volver a la pestaña, 
          reconectar internet, o cuando los datos están "stale"</li>
          <li><strong>Retry:</strong> Reintenta automáticamente si falla</li>
          <li><strong>Loading states:</strong> isLoading, isFetching, isRefetching</li>
          <li><strong>DevTools:</strong> Inspecciona queries en tiempo real</li>
        </ul>
      </div>

      <div style={styles.experimentBox}>
        <h3>🧪 Experimenta con la Revalidación:</h3>
        <ol>
          <li><strong>staleTime configurado a 5 segundos</strong> - Abre DevTools y observa</li>
          <li>Navega a otro ejemplo y vuelve aquí <strong>antes de 5 segundos</strong>
            <br />→ ✅ NO hace refetch (datos fresh, vienen de caché)</li>
          <li>Espera más de 5 segundos y navega a otro ejemplo
            <br />→ 🔄 SÍ hace refetch (datos stale, se revalidan)</li>
          <li>Cambia a otra pestaña del navegador y vuelve
            <br />→ 🔄 Revalida automáticamente (si están stale)</li>
        </ol>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
          💡 <strong>¿Por qué veías fetch cada vez?</strong> Porque el staleTime por defecto es 0ms.
          <br />Ahora está en 5000ms (5s), así que verás menos refetches innecesarios.
        </p>
      </div>

      <div style={styles.info}>
        <strong>🔑 Query Key:</strong> <code>["posts"]</code> - 
        Identifica esta query en el caché
      </div>

      <div style={styles.postList}>
        {data!.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <div style={styles.tip}>
        💡 <strong>Tip:</strong> Abre el DevTools (esquina inferior derecha) 
        para ver el estado de esta query en tiempo real.
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  benefitsBox: {
    background: "#d4edda",
    border: "2px solid #28a745",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  experimentBox: {
    background: "#fff3e0",
    border: "2px solid #ff9800",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  info: {
    background: "#e7f3ff",
    border: "1px solid #2196F3",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "15px",
    fontFamily: "monospace",
  },
  postList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  postCard: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
  },
  tip: {
    background: "#fff9e6",
    border: "1px solid #ffc107",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "14px",
  },
};
