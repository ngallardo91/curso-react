
// TaskList.tsx
import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void; // 🔸 Prop recibida
}

export function TaskList({ tasks, onDelete, onToggle }: Props) {
  if (tasks.length === 0) return <p>No hay tareas.</p>;

  return (
    <ul>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onDelete={onDelete}
          onToggle={onToggle}    // 🔸 se la pasa a cada item
        />
      ))}
       </ul>
  );

}



