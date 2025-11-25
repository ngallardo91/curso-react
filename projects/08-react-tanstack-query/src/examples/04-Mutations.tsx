import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * 📚 EJEMPLO 4: useMutation (Crear, Actualizar, Eliminar)
 * 
 * useMutation se usa para operaciones que MODIFICAN datos:
 * ✅ POST: Crear recursos
 * ✅ PUT/PATCH: Actualizar recursos
 * ✅ DELETE: Eliminar recursos
 * 
 * Conceptos clave:
 * - mutationFn: función que hace la petición
 * - onSuccess: callback cuando la mutación es exitosa
 * - onError: callback cuando la mutación falla
 * - queryClient.invalidateQueries(): refresca queries relacionadas
 */

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// 1️⃣ Función que obtiene todos (para demostrar la invalidación)
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.json();
};

// 2️⃣ Función que crea un nuevo todo (POST)
const createTodo = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }
  );
  
  if (!response.ok) {
    throw new Error("Error al crear todo");
  }
  
  return response.json();
};

// 3️⃣ Función que elimina un todo (DELETE)
const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { method: "DELETE" }
  );
  
  if (!response.ok) {
    throw new Error("Error al eliminar todo");
  }
};

export default function Mutations() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // 4️⃣ Query para obtener la lista de todos
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // 5️⃣ Mutation para CREAR un todo
  const createMutation = useMutation({
    mutationFn: createTodo,
    
    // onSuccess se ejecuta cuando la mutación es exitosa
    onSuccess: () => {
      // Invalidamos la query de todos para que se recargue
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      
      console.log("✅ Todo creado exitosamente");
    },
    
    onError: (error) => {
      console.error("❌ Error al crear:", error);
    },
  });

  // 6️⃣ Mutation para ELIMINAR un todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    
    onSuccess: () => {
      // Invalidamos la query de todos para que se recargue
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      
      console.log("✅ Todo eliminado exitosamente");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    // 7️⃣ Ejecutamos la mutación con mutate()
    createMutation.mutate({
      title,
      completed: false,
      userId: 1,
    });

    setTitle("");
  };

  if (isLoading) {
    return <div style={styles.container}>
      <h2>🔄 useMutation (Crear y Eliminar)</h2>
      <p>⏳ Cargando todos...</p>
    </div>;
  }

  return (
    <div style={styles.container}>
      <h2>🔄 useMutation (Crear y Eliminar)</h2>
      
      <div style={styles.conceptsBox}>
        <h3>📖 Conceptos clave:</h3>
        <ul>
          <li><strong>useMutation:</strong> Hook para modificar datos (POST/PUT/DELETE)</li>
          <li><strong>mutate():</strong> Ejecuta la mutación</li>
          <li><strong>invalidateQueries():</strong> Refresca queries relacionadas</li>
          <li><strong>isPending:</strong> true mientras se ejecuta la mutación</li>
          <li><strong>isSuccess/isError:</strong> Estado de la mutación</li>
        </ul>
      </div>

      {/* Formulario para crear todos */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nuevo todo..."
          style={styles.input}
          disabled={createMutation.isPending}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={createMutation.isPending || !title.trim()}
        >
          {createMutation.isPending ? "⏳ Creando..." : "➕ Crear Todo"}
        </button>
      </form>

      {/* Estados de la mutación de crear */}
      {createMutation.isSuccess && (
        <div style={styles.successBox}>
          ✅ Todo creado exitosamente
        </div>
      )}
      
      {createMutation.isError && (
        <div style={styles.errorBox}>
          ❌ Error: {createMutation.error.message}
        </div>
      )}

      {/* Lista de todos */}
      <div style={styles.todoList}>
        {todos?.map((todo) => (
          <div key={todo.id} style={styles.todoCard}>
            <div style={styles.todoContent}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                readOnly
                style={{ marginRight: "10px" }}
              />
              <span style={todo.completed ? styles.completed : {}}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              style={styles.deleteButton}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "⏳" : "🗑️"}
            </button>
          </div>
        ))}
      </div>

      <div style={styles.tip}>
        💡 <strong>Tip:</strong> Abre la consola del navegador para ver los logs de 
        onSuccess/onError. También puedes ver las mutaciones en el DevTools.
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
    background: "#f3e5f5",
    border: "2px solid #9c27b0",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  submitButton: {
    background: "#9c27b0",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successBox: {
    background: "#d4edda",
    border: "1px solid #28a745",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "15px",
    color: "#155724",
  },
  errorBox: {
    background: "#f8d7da",
    border: "1px solid #dc3545",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "15px",
    color: "#721c24",
  },
  todoList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  todoCard: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  completed: {
    textDecoration: "line-through",
    color: "#999",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "18px",
  },
  tip: {
    background: "#fff9e6",
    border: "1px solid #ffc107",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "14px",
  },
};
