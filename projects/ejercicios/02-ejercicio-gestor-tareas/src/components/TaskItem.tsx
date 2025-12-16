
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export function TaskItem({ task, onDelete, onToggle }: Props) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      {/*  Checkbox que refleja el estado y llama a onToggle */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.title}" como ${task.completed ? "pendiente" : "completada"}`}
      />

      {/* Texto con estilo dinámico si está completada */}
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.7 : 1,
        }}
      >
        {task.title} ({task.priority})
      </span>

      {/* Botón eliminar (queda igual) */}
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: "auto" }}>
        Eliminar
      </button>
    </li>
  );
}
``
