
import { useState } from 'react'
import './App.css'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskCounter } from './components/TaskCounter'
import type { Task } from './types/task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Preparar presentación", priority: "alta", completed: false },
    { id: 2, title: "Revisar mails", priority: "media", completed: true },
  ]);

  const [filter, setFilter] = useState<"todas" | "completadas" | "pendientes">("todas");

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };




  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };









  const addTask = (title: string, priority: "baja" | "media" | "alta") => {
    // 
    setTasks(prev => {
      const maxId = prev.length ? Math.max(...prev.map(t => t.id)) : 0;
      const nextId = maxId + 1;

      const nueva: Task = {
        id: nextId,
        title: title.trim(),
        priority,
        completed: false,
      };

      // Podés elegir al inicio o al final; acá lo agrego al inicio:
      return [nueva, ...prev];
      // Si preferís al final, usá: return [...prev, nueva];
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completadas") return task.completed;
    if (filter === "pendientes") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Gestor de Tareas - Trabajo Practico Numero 2</h1>
      <TaskCounter tasks={tasks} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
}



export default App
