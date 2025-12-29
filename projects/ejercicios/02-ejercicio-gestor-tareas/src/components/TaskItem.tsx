import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export function TaskItem({ task, onDelete, onToggle }: Props) {
  return (
    <li style={{ marginBottom: 8 }}>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginRight: 8,
        }}
      >
        Id: {task.id} Tarea: {task.title} ({task.priority})
      </span>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Desmarcar" : "Completar"}
      </button>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: 8 }}>
        Eliminar
      </button>
    </li>
  );
}
