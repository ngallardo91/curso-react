export type TaskPriority = "baja" | "media" | "alta"

export type TaskFilter = "todas" | "completadas" | "pendientes"

export type Task = {
  id: number
  title: string
  priority: TaskPriority
  completed: boolean
}
