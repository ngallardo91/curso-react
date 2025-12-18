import { useState } from 'react';
import './App.css';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskCounter } from './components/TaskCounter';
import type { Task, Priority, Filter } from './types/task';

function App() {
  // Estado de tareas
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Preparar presentación", priority: "alta", completed: false },
    { id: 2, title: "Revisar mails", priority: "media", completed: true },
  ]);

  // Estado de filtro
  const [filter, setFilter] = useState<Filter>("todas");

  // Eliminar tarea (ya estaba hecho)
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 2) Marcar tareas como completadas / alternar completed
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 1) Agregar tareas nuevas
  const addTask = (title: string, priority: Priority) => {
    setTasks((prev) => {
      // Generar id incremental: tomar el máximo actual y +1
      const maxId = prev.reduce((max, t) => (t.id > max ? t.id : max), 0);
      const newTask: Task = {
        id: maxId + 1,
        title,
        priority,
        completed: false,
      };
      return [...prev, newTask];
    });
  };

  // Filtrar tareas según el estado del filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completadas") return task.completed;
    if (filter === "pendientes") return !task.completed;
    return true; // "todas"
  });

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Gestor de Tareas</h1>

      {/* Contador de tareas */}
      <TaskCounter tasks={tasks} />

      {/* Selector de filtro */}
      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* Formulario para agregar */}
      <TaskForm onAddTask={addTask} />

      {/* Lista de tareas */}
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
}

export default App;