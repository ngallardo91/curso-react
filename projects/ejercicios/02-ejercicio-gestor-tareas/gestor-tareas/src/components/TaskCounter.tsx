import type { Task } from "../types/task"

type Props = {
  tasks: Task[]
}

function TaskCounter({ tasks }: Props) {
  const total = tasks.length
  const completas = tasks.filter(t => t.completed).length
  const pendientes = total - completas

  return (
    <div>
      <p>Total: {total}</p>
      <p>Completadas: {completas}</p>
      <p>Pendientes: {pendientes}</p>
    </div>
  )
}

export default TaskCounter
