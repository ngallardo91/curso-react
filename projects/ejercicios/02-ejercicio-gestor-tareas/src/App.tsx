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

  // Borra tarea
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Marcar completada/pendiente
  const toggleTask = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        // Invertir el valor de completed conservando el resto del objeto
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // Agregar nueva tarea
  const addTask = (title: string, priority: "baja" | "media" | "alta") => {
    // Calcular ID nuevo (si no hay tareas, empieza en 1)
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const newId = maxId + 1;

    // Crear el objeto
    const newTask: Task = {
      id: newId,
      title: title,
      priority: priority,
      completed: false
    };

    // Agregar al array de forma inmutable
    setTasks([...tasks, newTask]);
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
      
      {/* Conectamos la función addTask */}
      <TaskForm onAddTask={addTask} />
      
      {/* Conectamos toggleTask */}
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
}

export default App