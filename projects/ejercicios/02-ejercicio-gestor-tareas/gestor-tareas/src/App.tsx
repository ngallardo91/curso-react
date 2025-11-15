import { useState } from "react"
import type { Task, TaskFilter, TaskPriority } from "./types/task"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import TaskCounter from "./components/TaskCounter"
import TaskFilterSelect from "./components/TaskFilterSelect"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskFilter>("todas")

  const addTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      priority,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === "completadas") return t.completed
    if (filter === "pendientes") return !t.completed
    return true
  })

  return (
    <div>
      <h1>Gestor de Tareas</h1>

      <TaskForm addTask={addTask} />

      <TaskFilterSelect value={filter} onChange={setFilter} />

      <TaskCounter tasks={tasks} />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  )
}

export default App

