import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * 📚 EJEMPLO 5: Optimistic Updates (Actualizaciones Optimistas)
 * 
 * Optimistic Updates mejoran la UX mostrando cambios ANTES de que el servidor responda:
 * 
 * Flujo normal:
 * 1. Usuario hace clic → 2. Enviamos al servidor → 3. Esperamos respuesta → 4. Actualizamos UI
 * 
 * Con Optimistic Updates:
 * 1. Usuario hace clic → 2. Actualizamos UI inmediatamente → 3. Enviamos al servidor
 * 4. Si falla, revertimos los cambios (rollback)
 * 
 * ✅ La app se siente más rápida
 * ✅ Mejor experiencia de usuario
 * ⚠️ Necesita manejo de errores para rollback
 */

interface Comment {
  id: number;
  email: string;
  body: string;
}

// Función que obtiene comentarios
const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=5"
  );
  return response.json();
};

// Función que crea un comentario
const createComment = async (newComment: Omit<Comment, "id">): Promise<Comment> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }
  );
  
  if (!response.ok) {
    throw new Error("Error al crear comentario");
  }
  
  return response.json();
};

export default function OptimisticUpdates() {
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  // Query para obtener comentarios
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments-optimistic"],
    queryFn: fetchComments,
  });

  // Mutation con Optimistic Updates
  const mutation = useMutation({
    mutationFn: createComment,
    
    // 1️⃣ onMutate: Se ejecuta ANTES de hacer la petición
    // Aquí es donde hacemos la actualización optimista
    onMutate: async (newComment) => {
      // Cancelamos queries en progreso para evitar que sobrescriban nuestro update
      await queryClient.cancelQueries({ queryKey: ["comments-optimistic"] });

      // Guardamos el estado anterior por si necesitamos hacer rollback
      const previousComments = queryClient.getQueryData<Comment[]>(["comments-optimistic"]);

      // Actualizamos el caché OPTIMÍSTICAMENTE
      queryClient.setQueryData<Comment[]>(["comments-optimistic"], (old) => {
        if (!old) return old;
        
        // Agregamos el nuevo comentario con un ID temporal
        return [
          { id: Date.now(), ...newComment },
          ...old,
        ];
      });

      // Retornamos el contexto (datos anteriores) para usarlo en onError
      return { previousComments };
    },

    // 2️⃣ onError: Si la mutación falla, hacemos ROLLBACK
    onError: (error, _newComment, context) => {
      console.error("❌ Error en mutación:", error);
      
      // Restauramos el estado anterior
      if (context?.previousComments) {
        queryClient.setQueryData(["comments-optimistic"], context.previousComments);
      }
    },

    // 3️⃣ onSettled: Se ejecuta siempre (éxito o error)
    // Refrescamos la query para sincronizar con el servidor
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments-optimistic"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!body.trim()) return;

    mutation.mutate({
      email: "estudiante@ejemplo.com",
      body,
    });

    setBody("");
  };

  if (isLoading) {
    return <div style={styles.container}>
      <h2>⚡ Optimistic Updates</h2>
      <p>⏳ Cargando comentarios...</p>
    </div>;
  }

  return (
    <div style={styles.container}>
      <h2>⚡ Optimistic Updates (Actualizaciones Optimistas)</h2>
      
      <div style={styles.conceptsBox}>
        <h3>📖 Flujo de Optimistic Updates:</h3>
        <ol>
          <li><strong>onMutate:</strong> Actualiza UI inmediatamente (antes del servidor)</li>
          <li><strong>mutationFn:</strong> Envía la petición al servidor en background</li>
          <li><strong>onError:</strong> Si falla, revierte los cambios (rollback)</li>
          <li><strong>onSettled:</strong> Refresca datos del servidor (siempre)</li>
        </ol>
      </div>

      <div style={styles.comparisonBox}>
        <div style={styles.comparisonColumn}>
          <h4>❌ Sin Optimistic Updates</h4>
          <p>Click → Loading → Espera → UI actualizada</p>
          <p style={{ color: "#dc3545" }}>Puede sentirse lento</p>
        </div>
        <div style={styles.comparisonColumn}>
          <h4>✅ Con Optimistic Updates</h4>
          <p>Click → UI actualizada → Confirma servidor</p>
          <p style={{ color: "#28a745" }}>Se siente instantáneo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribe un comentario (se agregará instantáneamente)..."
          style={styles.textarea}
          rows={3}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={!body.trim()}
        >
          💬 Comentar (Optimistic)
        </button>
      </form>

      {mutation.isError && (
        <div style={styles.errorBox}>
          ❌ Error: {mutation.error.message}
          <br />
          <small>Los cambios fueron revertidos automáticamente</small>
        </div>
      )}

      <div style={styles.commentList}>
        {comments?.map((comment) => (
          <div 
            key={comment.id} 
            style={{
              ...styles.commentCard,
              // Destacamos los comentarios recién agregados
              opacity: comment.id > 500 ? 0.7 : 1,
            }}
          >
            <div style={styles.commentHeader}>
              <strong>{comment.email}</strong>
              {comment.id > 500 && (
                <span style={styles.newBadge}>✨ Nuevo</span>
              )}
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

      <div style={styles.tip}>
        💡 <strong>Prueba esto:</strong> Agrega un comentario y observa cómo aparece 
        instantáneamente en la lista (antes de que el servidor responda). 
        Esto es el Optimistic Update en acción.
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
  conceptsBox: {
    background: "#fff3cd",
    border: "2px solid #ffc107",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  comparisonBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px",
  },
  comparisonColumn: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
  },
  form: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    marginBottom: "10px",
    fontFamily: "inherit",
    resize: "vertical" as const,
  },
  submitButton: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
  errorBox: {
    background: "#f8d7da",
    border: "1px solid #dc3545",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "15px",
    color: "#721c24",
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
    transition: "opacity 0.3s",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  newBadge: {
    background: "#ffc107",
    color: "#000",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  tip: {
    background: "#e7f3ff",
    border: "1px solid #2196F3",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "14px",
  },
};
