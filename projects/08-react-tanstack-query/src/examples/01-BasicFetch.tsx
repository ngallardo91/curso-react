import { useState, useEffect } from "react";

/**
 * 📚 EJEMPLO 1: FETCH TRADICIONAL (Sin TanStack Query)
 * 
 * Este ejemplo muestra los PROBLEMAS de gestionar estado manualmente:
 * ❌ Mucho código repetitivo (boilerplate)
 * ❌ Gestión manual de loading, error, data
 * ❌ No hay caché automática
 * ❌ No hay revalidación automática
 * ❌ Difícil de manejar múltiples peticiones
 */

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function BasicFetch() {
  // 🔴 Necesitamos 3 estados diferentes para una petición simple
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🔴 Código repetitivo en cada componente que necesite datos
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        
        if (!response.ok) {
          throw new Error("Error al cargar posts");
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    
    // 🔴 Sin caché: cada vez que se monta el componente, hace fetch de nuevo
  }, []);

  // 🔴 Lógica de renderizado condicional repetitiva
  if (isLoading) {
    return <div style={styles.container}>
      <h2>📝 Fetch Tradicional (Sin TanStack Query)</h2>
      <p>⏳ Cargando posts...</p>
    </div>;
  }

  if (error) {
    return <div style={styles.container}>
      <h2>📝 Fetch Tradicional (Sin TanStack Query)</h2>
      <p style={{ color: "red" }}>❌ Error: {error}</p>
    </div>;
  }

  return (
    <div style={styles.container}>
      <h2>📝 Fetch Tradicional (Sin TanStack Query)</h2>
      
      <div style={styles.problemsBox}>
        <h3>🔴 Problemas de este enfoque:</h3>
        <ul>
          <li>Mucho código boilerplate (3 estados por petición)</li>
          <li>Sin caché: recarga cada vez que montas el componente</li>
          <li>Sin revalidación automática</li>
          <li>Difícil sincronizar múltiples componentes</li>
          <li>No hay manejo de estados antiguos (stale data)</li>
          <li>Difícil implementar retry automático</li>
        </ul>
      </div>

      <div style={styles.postList}>
        {posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
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
  problemsBox: {
    background: "#fff3cd",
    border: "2px solid #ffc107",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  postList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  postCard: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
  },
};
