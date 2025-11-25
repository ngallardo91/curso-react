import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";
import type { Comment } from "../api/comments";

/**
 * 🎯 Custom Hook que combina useInfiniteQuery + useMutation
 * 
 * Este hook demuestra conceptos avanzados:
 * - Paginación infinita con useInfiniteQuery
 * - Mutaciones con useMutation
 * - Optimistic Updates (actualizaciones instantáneas)
 * - Manejo de errores con rollback automático
 */
export function useComments() {
  // queryClient nos permite manipular el caché de queries
  const queryClient = useQueryClient();

  // 🔍 QUERY: Obtiene comentarios con paginación infinita
  const query = useInfiniteQuery({
    // Identificador único de esta query en el caché
    queryKey: ["comments"],
    
    // Función que obtiene los datos (recibe pageParam automáticamente)
    queryFn: fetchComments,
    
    // Parámetro inicial para la primera página
    initialPageParam: undefined,
    
    // Función que determina el siguiente pageParam (null = no hay más páginas)
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // ➕ MUTATION: Crea un nuevo comentario con Optimistic Update
  const mutation = useMutation({
    mutationFn: async (newComment: Omit<Comment, "id">) => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.json();
    },

    // 🚀 onMutate: Se ejecuta ANTES de enviar al servidor (Optimistic Update)
    onMutate: async (newComment) => {
      // 1. Cancelamos queries en progreso para evitar que sobrescriban nuestros cambios
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      // 2. Guardamos el estado anterior por si necesitamos hacer rollback
      const prevData = queryClient.getQueryData(["comments"]);

      // 3. Actualizamos el caché inmediatamente (antes de la respuesta del servidor)
      queryClient.setQueryData<InfiniteData<{ comments: Comment[]; nextCursor?: number }>>(["comments"], (old) => {
        if (!old) return old;
        return {
          pages: [
            {
              // Añadimos el nuevo comentario al inicio de la primera página
              comments: [
                { id: Date.now(), ...newComment }, // ID temporal con timestamp
                ...old.pages[0].comments,
              ],
            },
            ...old.pages.slice(1), // Mantenemos el resto de páginas
          ],
          pageParams: old.pageParams,
        };
      });

      // 4. Retornamos el contexto para usarlo en onError si es necesario
      return { prevData };
    },

    // ❌ onError: Si la mutación falla, revertimos los cambios (ROLLBACK)
    onError: (_err, _newTodo, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["comments"], context.prevData);
      }
    },

    // 🔄 onSettled: Se ejecuta siempre (success o error), refresca los datos del servidor
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return {
    ...query,
    createComment: mutation.mutate,
  };
}
