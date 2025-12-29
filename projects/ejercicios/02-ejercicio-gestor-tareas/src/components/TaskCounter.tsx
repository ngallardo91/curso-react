import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export function TaskCounter({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
   const alta=tasks.filter((t)=> t.priority=== 'alta' && !t.completed ).length;
  return (
    <p>
      <li> Tareas completadas: {completed} / {total} </li>
      <li>Tareas Prioridad Alta Pendientes: {alta} </li>
    </p>
  );
}