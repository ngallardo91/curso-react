# 📚 TanStack Query - Tutorial Interactivo

> Proyecto educativo para enseñar **TanStack Query** (React Query) de forma progresiva y práctica

## 🎯 Objetivo del Proyecto

Este proyecto está diseñado específicamente para **enseñar TanStack Query en clases**, con ejemplos progresivos que van desde lo más básico hasta conceptos avanzados. Cada ejemplo incluye:

- ✅ Comentarios explicativos en el código
- ✅ Cajas informativas con conceptos clave
- ✅ Comparaciones "antes/después"
- ✅ Tips y mejores prácticas

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## 📖 Estructura de los Ejemplos

El proyecto incluye **6 ejemplos progresivos**:

### 1️⃣ Fetch Tradicional (Sin TanStack Query)
**Archivo:** `src/examples/01-BasicFetch.tsx`

**Qué enseña:**
- Problemas del enfoque tradicional con `useState` + `useEffect`
- Código repetitivo (boilerplate)
- Sin caché automática
- Gestión manual de estados

**Conceptos clave:**
- Estado de loading, error, data
- useEffect con fetch
- Limitaciones del enfoque tradicional

---

### 2️⃣ useQuery Básico
**Archivo:** `src/examples/02-BasicQuery.tsx`

**Qué enseña:**
- Primer contacto con TanStack Query
- Ventajas sobre el fetch tradicional
- Configuración básica de `useQuery`

**Conceptos clave:**
- `queryKey`: Identificador único de la query
- `queryFn`: Función que obtiene los datos
- Estados: `isLoading`, `isError`, `data`
- Caché automática
- Revalidación automática

---

### 3️⃣ Paginación Infinita (useInfiniteQuery)
**Archivo:** `src/examples/03-InfiniteQuery.tsx`

**Qué enseña:**
- Infinite scroll con `useInfiniteQuery`
- Paginación eficiente
- Intersection Observer API

**Conceptos clave:**
- `pageParam`: Parámetro de paginación
- `getNextPageParam`: Determina la siguiente página
- `data.pages`: Array de páginas cargadas
- `fetchNextPage()`: Carga la siguiente página
- `hasNextPage`: Indica si hay más datos

---

### 4️⃣ Mutations (Crear, Actualizar, Eliminar)
**Archivo:** `src/examples/04-Mutations.tsx`

**Qué enseña:**
- Operaciones que modifican datos (POST, PUT, DELETE)
- `useMutation` hook
- Invalidación de queries

**Conceptos clave:**
- `mutationFn`: Función que hace la petición
- `mutate()`: Ejecuta la mutación
- `isPending`: Estado de la mutación
- `onSuccess`: Callback de éxito
- `onError`: Callback de error
- `queryClient.invalidateQueries()`: Refresca queries

---

### 5️⃣ Optimistic Updates
**Archivo:** `src/examples/05-OptimisticUpdates.tsx`

**Qué enseña:**
- Actualizaciones optimistas para mejor UX
- Actualizar UI antes de la respuesta del servidor
- Rollback en caso de error

**Conceptos clave:**
- `onMutate`: Actualización optimista (antes del servidor)
- `cancelQueries()`: Cancela queries en progreso
- `setQueryData()`: Actualiza el caché manualmente
- Rollback automático con `onError`
- Contexto para guardar estado anterior

**Flujo:**
1. Usuario hace acción
2. UI se actualiza inmediatamente
3. Se envía petición al servidor
4. Si falla, se revierte el cambio

---

### 6️⃣ Ejemplo Completo
**Componentes:** `CommentList.tsx` + `CommentForm.tsx` + `useComments.ts`

**Qué enseña:**
- Combinación de todos los conceptos
- `useInfiniteQuery` + `useMutation` + Optimistic Updates
- Custom hook que abstrae la lógica
- Arquitectura real de una aplicación

---

## 🎓 Cómo Usar Este Proyecto en Clase

### Opción 1: Presentación Progresiva (Recomendado)

1. **Comienza con el ejemplo 1** (Fetch Tradicional)
   - Muestra el código
   - Ejecuta la app
   - Destaca los problemas: código repetitivo, sin caché, etc.

2. **Pasa al ejemplo 2** (useQuery Básico)
   - Muestra cómo TanStack Query simplifica todo
   - Abre el DevTools para mostrar el caché
   - Cambia de pestaña y vuelve para demostrar la revalidación

3. **Continúa con los ejemplos 3, 4, 5**
   - Cada uno añade un concepto nuevo
   - Usa el DevTools para inspeccionar queries/mutations
   - Anima a los estudiantes a experimentar

4. **Finaliza con el ejemplo 6**
   - Muestra cómo todo se integra en una app real
   - Revisa el código de `useComments.ts`
   - Explica la arquitectura

### Opción 2: Coding en Vivo

1. Empieza desde cero con el ejemplo 1
2. Pide a los estudiantes que identifiquen los problemas
3. Implementa juntos el ejemplo 2
4. Continúa construyendo los demás ejemplos paso a paso

### Opción 3: Ejercicios Prácticos

Usa este proyecto como base y pide a los estudiantes:
- Crear un nuevo ejemplo con otra API
- Implementar filtros en la lista
- Agregar paginación tradicional (no infinita)
- Implementar actualización de comentarios (PUT)
- Agregar eliminación de comentarios

---

## 🔧 Estructura del Proyecto

```
src/
├── examples/              # Ejemplos progresivos
│   ├── 01-BasicFetch.tsx
│   ├── 02-BasicQuery.tsx
│   ├── 03-InfiniteQuery.tsx
│   ├── 04-Mutations.tsx
│   └── 05-OptimisticUpdates.tsx
│
├── components/            # Componentes del ejemplo completo
│   ├── CommentList.tsx
│   └── CommentForm.tsx
│
├── hooks/                 # Custom hooks
│   ├── useComments.ts     # Hook principal (ejemplo avanzado)
│   └── useInfiniteScrooll.ts
│
├── api/                   # Funciones de API
│   └── comments.ts
│
├── App.tsx               # Navegación entre ejemplos
└── main.tsx              # Setup de QueryClient
```

---

## 📊 Conceptos Clave de TanStack Query

### 1. Query States

```typescript
{
  isLoading,    // Primera carga (no hay data en caché)
  isFetching,   // Cargando en background
  isError,      // Hubo un error
  isSuccess,    // Datos cargados exitosamente
  data,         // Los datos
  error,        // El error (si hay)
}
```

### 2. Query Configuration

```typescript
useQuery({
  queryKey: ["posts"],           // Identificador único
  queryFn: fetchPosts,           // Función que obtiene datos
  staleTime: 5000,               // Tiempo antes de considerar datos "viejos"
  refetchOnWindowFocus: true,    // Refetch al volver a la pestaña
  retry: 3,                      // Reintentos en caso de error
})
```

### 3. Query Invalidation

```typescript
// Invalida y refresca una query específica
queryClient.invalidateQueries({ queryKey: ["posts"] });

// Invalida todas las queries
queryClient.invalidateQueries();

// Invalida queries que empiecen con "posts"
queryClient.invalidateQueries({ queryKey: ["posts"] });
```

### 4. Mutation Lifecycle

```typescript
useMutation({
  mutationFn: createPost,
  onMutate: async (newPost) => {
    // ANTES de enviar al servidor
    // Aquí va el optimistic update
  },
  onSuccess: (data) => {
    // Cuando la mutación es exitosa
  },
  onError: (error, variables, context) => {
    // Si falla, hacer rollback
  },
  onSettled: () => {
    // Siempre (success o error)
    // Refrescar datos del servidor
  },
})
```

---

## 🎨 React Query DevTools

El proyecto incluye el **DevTools** para inspeccionar queries en tiempo real.

**Cómo usarlo en clase:**

1. Haz clic en el ícono flotante (esquina inferior derecha)
2. Muestra las queries activas
3. Explica los estados: `fresh`, `stale`, `inactive`
4. Demuestra la invalidación manual
5. Muestra las mutaciones y su estado

**Tips:**
- El color verde = datos frescos (fresh)
- El color amarillo = datos viejos (stale)
- El color gris = query inactiva

---

## 🌐 API Usada

Este proyecto usa **JSONPlaceholder** (https://jsonplaceholder.typicode.com/):
- Gratuita
- No requiere autenticación
- Perfecta para demos

**Endpoints usados:**
- `GET /posts` - Lista de posts
- `GET /todos` - Lista de todos
- `GET /comments` - Lista de comentarios
- `POST /comments` - Crear comentario (simulado)
- `DELETE /todos/:id` - Eliminar todo (simulado)

---

## 💡 Tips para Enseñar

### 1. Usa el DevTools constantemente
Muestra en tiempo real cómo cambia el estado de las queries.

### 2. Demuestra la caché
- Navega entre ejemplos y vuelve
- Los datos se cargan instantáneamente (desde caché)

### 3. Simula errores
Modifica temporalmente las URLs de las APIs para mostrar el manejo de errores.

### 4. Compara tiempos
Usa el Network tab del navegador para mostrar que con TanStack Query la UI se actualiza más rápido.

### 5. Experimenta en vivo
Cambia valores de `staleTime`, `refetchOnWindowFocus`, etc. y muestra el efecto.

---

## 📝 Ejercicios Propuestos para Estudiantes

### Nivel Básico
1. Agregar un nuevo ejemplo que use otra API
2. Cambiar el `staleTime` y observar el comportamiento
3. Implementar un botón de "Refrescar" manual

### Nivel Intermedio
4. Agregar filtros a la lista de comentarios
5. Implementar paginación con botones "Anterior/Siguiente"
6. Crear un formulario para editar comentarios existentes

### Nivel Avanzado
7. Implementar eliminación de comentarios con optimistic update
8. Agregar búsqueda en tiempo real con debounce
9. Crear un custom hook para manejar múltiples recursos
10. Implementar prefetch de datos

---

## 🔗 Recursos Adicionales

- [Documentación oficial de TanStack Query](https://tanstack.com/query/latest)
- [React Query Tutorial en YouTube](https://www.youtube.com/results?search_query=tanstack+query+tutorial)
- [TanStack Query Ejemplos](https://tanstack.com/query/latest/docs/examples/react/basic)

---

## 🤝 Contribuciones

Si encuentras formas de mejorar este material educativo:
1. Haz un fork del proyecto
2. Crea una rama con tu mejora
3. Envía un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

## ✨ Autor

Creado con ❤️ para enseñar TanStack Query de forma clara y progresiva.

---

**¡Feliz enseñanza! 🎓**
