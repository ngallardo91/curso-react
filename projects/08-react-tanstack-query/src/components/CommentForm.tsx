import React, { useState } from "react";
import { useComments } from "../hooks/useComments";

/**
 * 📝 Formulario para crear comentarios
 * Demuestra Optimistic Updates: el comentario aparece instantáneamente
 */
export default function CommentForm() {
  const { createComment } = useComments();
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    // Llamamos a la mutation - el comentario aparecerá instantáneamente (optimistic update)
    createComment({
      email: "user@email.com",
      body,
    });

    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="Escribe un comentario... (aparecerá instantáneamente)"
        style={styles.textarea}
      />
      <button type="submit" style={styles.button} disabled={!body.trim()}>
        💬 Agregar Comentario
      </button>
    </form>
  );
}

const styles = {
  form: {
    marginBottom: 20,
    padding: 15,
    background: "#f8f9fa",
    borderRadius: 8,
    border: "1px solid #dee2e6",
  },
  textarea: {
    width: "100%",
    padding: 10,
    border: "1px solid #ced4da",
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "inherit",
    resize: "vertical" as const,
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500 as const,
  },
};
