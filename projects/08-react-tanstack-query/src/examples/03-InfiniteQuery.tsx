import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "../hooks/useInfiniteScrooll";

/**
 * 📚 EJEMPLO 3: useInfiniteQuery (Paginación Infinita)
 * 
 * useInfiniteQuery es ideal para:
 * ✅ Infinite scroll (carga automática al hacer scroll)
 * ✅ Botón "Cargar más"
 * ✅ Paginación eficiente con caché de páginas
 * 
 * Conceptos clave:
 * - pageParam: parámetro que identifica cada página
 * - getNextPageParam: función que calcula el siguiente pageParam
 * - data.pages: array con todas las páginas cargadas
 */

interface Comment {
  id: number;
  email: string;
  body: string;
}

// 1️⃣ Función de fetch que acepta pageParam
const LIMIT = 10; // Comentarios por página

const fetchComments = async ({ pageParam = 1 }): Promise<{
  comments: Comment[];
  nextCursor: number | null;
}> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=${LIMIT}`
  );
  
  const data: Comment[] = await response.json();
  
  // Si obtenemos menos del límite, no hay más páginas
  const hasMore = data.length === LIMIT;
  
  return {
    comments: data,
    nextCursor: hasMore ? pageParam + 1 : null,
  };
};

export default function InfiniteQuery() {
  // 2️⃣ useInfiniteQuery: Similar a useQuery pero con paginación
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,      // Función para cargar la siguiente página
    hasNextPage,        // true si hay más páginas
    isFetchingNextPage, // true mientras carga la siguiente página
  } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
    
    // initialPageParam: valor inicial de pageParam (obligatorio)
    // Este es el valor que se usa para la primera carga
    initialPageParam: 1,
    
    // ⭐ getNextPageParam: función CRÍTICA para infinite scroll
    // Se ejecuta después de cada fetch exitoso
    // Recibe la última página cargada (lastPage)
    // Debe retornar:
    //   - Un valor (número, string, etc.) si hay más páginas → se usa como siguiente pageParam
    //   - undefined o null si NO hay más páginas → hasNextPage = false
    //
    // Ejemplo: Si lastPage.nextCursor = 2, el próximo fetch recibirá pageParam = 2
    // Si lastPage.nextCursor = null, se detiene la paginación
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    
    // También existe getPreviousPageParam (para scroll hacia arriba, menos común):
    // getPreviousPageParam: (firstPage) => firstPage.previousCursor,
  });

  // 3️⃣ Hook personalizado para infinite scroll automático
  const { triggerRef } = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) {
    return <div style={styles.container}>
      <h2>♾️ useInfiniteQuery (Paginación Infinita)</h2>
      <p>⏳ Cargando comentarios...</p>
    </div>;
  }

  if (isError) {
    return <div style={styles.container}>
      <h2>♾️ useInfiniteQuery (Paginación Infinita)</h2>
      <p style={{ color: "red" }}>❌ Error: {error.message}</p>
    </div>;
  }

  // 4️⃣ data.pages es un array de páginas
  // Usamos flatMap para obtener todos los comentarios
  const allComments = data!.pages.flatMap((page) => page.comments);

  return (
    <div style={styles.container}>
      <h2>♾️ useInfiniteQuery (Paginación Infinita)</h2>
      
      <div style={styles.conceptsBox}>
        <h3>📖 Conceptos clave:</h3>
        <ul>
          <li><strong>pageParam:</strong> Identifica cada página (1, 2, 3...)</li>
          <li><strong>getNextPageParam:</strong> Calcula el siguiente pageParam</li>
          <li><strong>data.pages:</strong> Array con todas las páginas cargadas</li>
          <li><strong>fetchNextPage():</strong> Carga la siguiente página</li>
          <li><strong>hasNextPage:</strong> Indica si hay más páginas</li>
        </ul>
      </div>

      <div style={styles.info}>
        <strong>📊 Estado actual:</strong> {data!.pages.length} páginas cargadas, 
        {" "}{allComments.length} comentarios totales
      </div>

      <div style={styles.commentList}>
        {allComments.map((comment) => (
          <div key={comment.id} style={styles.commentCard}>
            <div style={styles.commentHeader}>
              <strong>#{comment.id}</strong>
              <span style={styles.email}>{comment.email}</span>
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

      {/* 5️⃣ Trigger de infinite scroll: cuando este div es visible, carga más */}
      {hasNextPage && (
        <div ref={triggerRef} style={styles.loadMore}>
          {isFetchingNextPage ? (
            <p>⏳ Cargando más comentarios...</p>
          ) : (
            <button onClick={() => fetchNextPage()} style={styles.button}>
              📥 Cargar más
            </button>
          )}
        </div>
      )}

      {!hasNextPage && (
        <div style={styles.endMessage}>
          🎉 ¡Has llegado al final!
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  conceptsBox: {
    background: "#e3f2fd",
    border: "2px solid #2196F3",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  info: {
    background: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "15px",
  },
  commentList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  commentCard: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "center",
  },
  email: {
    color: "#666",
    fontSize: "14px",
  },
  loadMore: {
    textAlign: "center" as const,
    padding: "20px",
  },
  button: {
    background: "#2196F3",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  endMessage: {
    textAlign: "center" as const,
    padding: "20px",
    color: "#666",
    fontSize: "18px",
  },
};
