import type{ Task } from "../types/task"

type Props = {
  task: Task
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
}

function TaskItem({ task, deleteTask, toggleTask }: Props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span>
        {task.title} ({task.priority})
      </span>

      <button onClick={() => deleteTask(task.id)}>X</button>
    </li>
  )
}

export default TaskItem
