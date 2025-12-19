/**
 * 📋 Tipo de datos para los comentarios
 * Estos datos vienen de JSONPlaceholder API
 */
export interface Comment {
  id: number;
  email: string;
  body: string;
}

// 🔢 Número de comentarios por página
const LIMIT = 10;

/**
 * 🔍 Función que obtiene comentarios con paginación
 * @param pageParam - Número de página a cargar (default: 1)
 * @returns Objeto con comentarios y el cursor para la siguiente página
 */
export async function fetchComments({ pageParam = 1 }): Promise<{
  comments: Comment[];
  nextCursor: number | null;
}> {
  // Hacemos la petición a JSONPlaceholder con parámetros de paginación
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=${LIMIT}`
  );

  const data: Comment[] = await res.json();

  // Si obtenemos la cantidad completa, asumimos que hay más páginas
  const hasMore = data.length === LIMIT;

  return {
    comments: data,
    // Si hay más, retornamos el siguiente número de página; si no, null
    nextCursor: hasMore ? pageParam + 1 : null,
  };
}
