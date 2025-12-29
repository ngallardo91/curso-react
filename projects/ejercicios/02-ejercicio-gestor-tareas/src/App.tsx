import { useState } from 'react'
import './App.css'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskCounter } from './components/TaskCounter'
import type { Filter, Priority, Task } from './types/task'

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Preparar presentación", priority: "alta", completed: false },
    { id: 2, title: "Revisar mails", priority: "media", completed: true },
  ]);

  //const [filter, setFilter] = useState<"todas" | "completadas" | "pendientes">("todas");
  const [filter, setFilter] = useState<Filter>("todas");

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    // TODO: cambiar el valor de completed de la tarea con ese id
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

 // const addTask = (title: string, priority: "baja" | "media" | "alta") => {
  const addTask = (title: string, priority: Priority) => {
    // TODO: agregar una nueva tarea con un id incremental
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    //crea nueva task
    const newTask:Task={
        id:newId,
        title,
      priority,
      completed:false,
    }

    //la agrega
    setTasks((prevTasks)=>[...prevTasks,newTask]);

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
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
}

export default App
