import { useQuery } from "@tanstack/react-query";

/**
 * 📚 EJEMPLO EXTRA: Compartir Datos de Queries entre Componentes
 * 
 * TanStack Query usa un CACHÉ GLOBAL compartido.
 * Si dos componentes usan la MISMA queryKey, comparten los mismos datos.
 * 
 * ✅ Ventajas de este enfoque:
 * - No necesitas Context API ni prop drilling
 * - No se hace fetch duplicado (se reutiliza el caché)
 * - Todos los componentes se sincronizan automáticamente
 * - Si un componente invalida la query, todos se actualizan
 */

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 📦 Función de fetch (puede estar en un archivo separado como /api/posts.ts)
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  
  if (!response.ok) {
    throw new Error("Error al cargar posts");
  }
  
  return response.json();
}

// 🎯 MÉTODO 1: Usar la misma queryKey en diferentes componentes
// Los componentes comparten automáticamente los datos del caché

function PostList() {
  // Este componente hace el fetch inicial
  const { data, isLoading } = useQuery({
    queryKey: ["posts"], // 🔑 Esta es la clave
    queryFn: fetchPosts,
    staleTime: 30000, // 30 segundos
  });

  if (isLoading) return <p>Cargando posts...</p>;

  return (
    <div style={styles.section}>
      <h3>📝 Lista de Posts (Componente 1)</h3>
      <div style={styles.postList}>
        {data?.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <h4>{post.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostCount() {
  // Este componente usa la MISMA queryKey
  // TanStack Query reutiliza los datos del caché (NO hace otro fetch)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["posts"], // 🔑 Misma clave = mismos datos
    queryFn: fetchPosts,
    staleTime: 30000,
  });

  if (isLoading) return <p>...</p>;

  return (
    <div style={styles.infoBox}>
      <strong>📊 Total de posts:</strong> {data?.length || 0}
      {isFetching && <span style={{ color: "#ff9800" }}> (actualizando...)</span>}
    </div>
  );
}

function PostTitles() {
  // Tercer componente usando la misma queryKey
  const { data } = useQuery({
    queryKey: ["posts"], // 🔑 Misma clave
    queryFn: fetchPosts,
    staleTime: 30000,
  });

  return (
    <div style={styles.infoBox}>
      <strong>📋 Títulos:</strong>
      <ul style={{ fontSize: "12px", marginTop: "5px" }}>
        {data?.slice(0, 3).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// 🎯 MÉTODO 2: Custom Hook (Recomendado para reutilización)
// Encapsula la lógica de la query en un hook personalizado

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 30000,
  });
}

// Ahora cualquier componente puede usar usePosts()
function AnotherComponent() {
  const { data, isLoading } = usePosts(); // ✨ Más limpio y reutilizable

  if (isLoading) return null;

  return (
    <div style={styles.infoBox}>
      <strong>🔄 Usando Custom Hook:</strong> {data?.length} posts
    </div>
  );
}

// Componente principal que demuestra todo
export default function SharedQueryExample() {
  return (
    <div style={styles.container}>
      <h2>🔗 Compartir Datos de Queries entre Componentes</h2>
      
      <div style={styles.conceptBox}>
        <h3>💡 Concepto Clave:</h3>
        <p>
          Los 4 componentes de abajo usan <code>queryKey: ["posts"]</code>.
          <br />
          TanStack Query hace <strong>UN SOLO fetch</strong> y comparte los datos.
        </p>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          👀 Abre el DevTools y verás que solo hay 1 query "posts" en el caché,
          pero es usada por múltiples componentes.
        </p>
      </div>

      {/* Todos estos componentes comparten la misma data */}
      <PostList />
      <PostCount />
      <PostTitles />
      <AnotherComponent />

      <div style={styles.methodsBox}>
        <h3>📚 Métodos para compartir datos:</h3>
        <ol>
          <li>
            <strong>Misma queryKey en diferentes componentes</strong>
            <br />
            <code>useQuery(&#123; queryKey: ["posts"], ... &#125;)</code>
            <br />
            ✅ Simple, automático, sin código extra
          </li>
          <li>
            <strong>Custom Hook (Recomendado)</strong>
            <br />
            <code>function usePosts() &#123; return useQuery(...) &#125;</code>
            <br />
            ✅ Más limpio, reutilizable, fácil de mantener
          </li>
          <li>
            <strong>queryClient.getQueryData()</strong>
            <br />
            <code>const data = queryClient.getQueryData(["posts"])</code>
            <br />
            ✅ Acceso directo al caché (sin suscripción a cambios)
          </li>
        </ol>
      </div>

      <div style={styles.tipBox}>
        💡 <strong>Tip:</strong> No necesitas Context API ni prop drilling.
        TanStack Query maneja todo a través de su caché global.
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
  conceptBox: {
    background: "#e3f2fd",
    border: "2px solid #2196F3",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  section: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
  },
  postList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginTop: "10px",
  },
  postCard: {
    background: "#f8f9fa",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
  },
  infoBox: {
    background: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "15px",
  },
  methodsBox: {
    background: "#fff3e0",
    border: "2px solid #ff9800",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  tipBox: {
    background: "#d4edda",
    border: "1px solid #28a745",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "14px",
  },
};
