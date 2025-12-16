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

  // Se infiere que el tipo de filtro es el mismo que en el estado
  const [filter, setFilter] = useState<"todas" | "completadas" | "pendientes">("todas");

  // --- FUNCIONES COMPLETADAS ---

  // 1. COMPLETADO: Agregar una nueva tarea
  const addTask = (title: string, priority: "baja" | "media" | "alta") => {
    if (title.trim() === '') return;

    // Obtener el siguiente ID incremental
    const nextId = tasks.length > 0
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1;

    const newTask: Task = {
      id: nextId,
      title: title,
      priority: priority,
      completed: false, // Las tareas nuevas siempre empiezan como pendientes
    };

    // Actualizar el estado de forma inmutable
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // 2. COMPLETADO: Marcar tareas como completadas (toggle)
  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        // Encontramos la tarea por ID
        if (task.id === id) {
          // Devolvemos una nueva tarea (inmutable) con el valor de 'completed' invertido
          return {
            ...task,
            completed: !task.completed,
          };
        }
        // Devolvemos las otras tareas sin cambios
        return task;
      })
    );
  };

  // 3. FUNCIÓN DE REFERENCIA (ya estaba): Eliminar tarea
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };


  // --- LÓGICA DE FILTRADO (Sin cambios) ---

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completadas") return task.completed;
    if (filter === "pendientes") return !task.completed;
    return true;
  });

  // --- RENDERIZADO (Se actualizaron los props de TaskForm) ---

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Gestor de Tareas</h1>
      <TaskCounter tasks={tasks} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      {/* Se asegura que TaskForm reciba la función addTask */}
      <TaskForm onAddTask={addTask} /> 
      {/* Se asegura que TaskList reciba la función toggleTask */}
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} /> 
    </div>
  )
}

export default App