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

  // Función para eliminar una tarea
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Función para alternar el estado de completada
  const toggleTask = (id: number) => {
    setTasks(tareasPrevias => 
      tareasPrevias.map(tarea => 
        tarea.id === id 
          ? { ...tarea, completed: !tarea.completed } 
          : tarea
      )
    );
  };

  // Función para agregar una nueva tarea
  const addTask = (title: string, priority: "baja" | "media" | "alta") => {
    const siguienteId = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.id)) + 1 
      : 1;
    
    const nuevaTarea: Task = {
      id: siguienteId,
      title,
      priority,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, nuevaTarea]);
  };

  // Filtrar tareas según el filtro seleccionado
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
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
}

export default App
