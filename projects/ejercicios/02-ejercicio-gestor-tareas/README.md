# 🧩 Ejercicio: Gestor de Tareas con React + TypeScript

## 🎯 Objetivo
Completar las funcionalidades faltantes siguiendo los ejemplos del código ya implementado.

---

## 🧠 Conceptos que se practican
- Estado local (`useState`)
- Props y comunicación entre componentes
- Manejo de listas (`map`, `filter`)
- Funciones que modifican el estado desde componentes hijos

---

## 🧩 Tareas a completar

1. **Agregar tareas nuevas**
   - Completar la función `addTask` en `App.tsx`.
   - Generar un `id` incremental.
   - Agregar la nueva tarea al estado.

2. **Marcar tareas como completadas**
   - Completar la función `toggleTask` en `App.tsx`.
   - Cambiar el valor de `completed` de la tarea seleccionada.

3. **Ver ejemplos de referencia**
   - Mirar `deleteTask`: usa `filter` para eliminar una tarea.
   - Mirar `TaskCounter`: cómo se calculan valores a partir del estado.
   - Mirar `TaskFilter`: cómo se usa un `select` para modificar estado.

4. **Crear los tipos para filtro y prioridad**
  - Mirar `task.ts`: como se crea un tipo de datos.

---

💡 Luego este mismo proyecto se usará para implementar **Zustand** y **TanStack Router**.
