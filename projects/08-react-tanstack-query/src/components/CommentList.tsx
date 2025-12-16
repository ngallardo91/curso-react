import { useComments } from "../hooks/useComments";
import { useInfiniteScroll } from "../hooks/useInfiniteScrooll";

/**
 * 📜 Lista de comentarios con paginación infinita
 * Demuestra useInfiniteQuery + Intersection Observer para scroll infinito
 */
export default function CommentList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,     // Función para cargar la siguiente página
    hasNextPage,       // true si hay más páginas disponibles
  } = useComments();

  // Hook personalizado que usa Intersection Observer
  // Cuando el elemento con triggerRef es visible, ejecuta el callback
  const { triggerRef } = useInfiniteScroll(() => {
    if (hasNextPage) fetchNextPage();
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar</p>;

  // data.pages es un array de páginas
  // flatMap convierte [[comments1], [comments2]] en [comment1, comment2, ...]
  const comments = data!.pages.flatMap((page) => page.comments);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          <strong>{comment.email}</strong>
          <p>{comment.body}</p>
        </div>
      ))}

      {hasNextPage && (
        <div ref={triggerRef} style={{ padding: 40, textAlign: "center" }}>
          <span>Cargar más...</span>
        </div>
      )}
    </div>
  );
}
