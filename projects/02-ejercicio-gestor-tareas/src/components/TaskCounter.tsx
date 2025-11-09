import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export function TaskCounter({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <p>
      Tareas completadas: {completed} / {total}
    </p>
  );
}
