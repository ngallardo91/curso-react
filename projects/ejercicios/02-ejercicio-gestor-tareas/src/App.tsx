import { useState } from "react";
import "./App.css";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskFilter } from "./components/TaskFilter";
import { TaskCounter } from "./components/TaskCounter";
import type { Task, TaskPriority, TaskFilter as FilterType } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Preparar presentación", priority: "alta", completed: false },
    { id: 2, title: "Revisar mails", priority: "media", completed: true },
  ]);

  const [filter, setFilter] = useState<FilterType>("todas");

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    // TODO resuelto: cambiar el valor de completed de la tarea con ese id
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const addTask = (title: string, priority: TaskPriority) => {
    // TODO resuelto: agregar una nueva tarea con un id incremental
    setTasks((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1;

      const nuevaTarea: Task = {
        id: nextId,
        title,
        priority,
        completed: false,
      };

      return [...prev, nuevaTarea];
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completadas") return task.completed;
    if (filter === "pendientes") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Gestor de Tareas</h1>
      <TaskCounter tasks={tasks} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
}

export default App;