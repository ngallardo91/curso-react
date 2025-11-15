import { useState } from "react"
import type{ TaskPriority } from "../types/task"

type Props = {
  addTask: (title: string, priority: TaskPriority) => void
}

function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("baja")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title, priority)
    setTitle("")
    setPriority("baja")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nueva tarea"
      />

      <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)}>
        <option value="baja">baja</option>
        <option value="media">media</option>
        <option value="alta">alta</option>
      </select>

      <button type="submit">Agregar</button>
    </form>
  )
}

export default TaskForm
