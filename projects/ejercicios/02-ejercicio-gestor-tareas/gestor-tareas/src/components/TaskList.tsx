import type { Task } from "../types/task"
import TaskItem from "./TaskItem"

type Props = {
  tasks: Task[]
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
}

function TaskList({ tasks, deleteTask, toggleTask }: Props) {
  return (
    <ul>
      {tasks.map(t => (
        <TaskItem
          key={t.id}
          task={t}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
