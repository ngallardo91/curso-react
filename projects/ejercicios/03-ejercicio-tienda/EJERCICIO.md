# Ejercicio de Tienda con React

La aplicación consume la API pública [Fake Store API](https://fakestoreapi.com/) para obtener productos.

## Objetivo del Ejercicio

El proyecto ya tiene algunas funcionalidades implementadas. Tu tarea es **completar las funcionalidades faltantes** tomando como referencia el código existente.

## Estructura del Proyecto

```
src/
├── routes/                    # Rutas de TanStack Router
│   ├── __root.tsx            # Layout principal con navegación
│   ├── index.tsx             # Página de inicio
│   ├── cart.tsx              # Carrito de compras
│   ├── products/             # Rutas de productos
│   │   ├── index.tsx         # Lista de todos los productos
│   │   └── $productId.tsx    # Detalle de producto individual
│   └── categories/           # Rutas de categorías
│       ├── index.tsx         # Lista de categorías
│       └── $category.tsx     # Productos por categoría
├── components/               # Componentes reutilizables
│   ├── ProductCard.tsx       # Tarjeta de producto
│   ├── CartItem.tsx          # Item del carrito
│   └── ProductSkeleton.tsx   # Skeleton loader
├── store/                    # Estado global con Zustand
│   └── cartStore.ts          # Store del carrito
├── services/                 # Servicios y API
│   └── api.ts                # Cliente de Axios y endpoints
└── types/                    # Tipos de TypeScript
    └── product.ts            # Interfaces de Product y CartItem
```

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

```

##  Funcionalidades Implementadas (Ejemplos de Referencia)

### 1. **Zustand Store** (`src/store/cartStore.ts`)
-  `addToCart`: Agregar productos al carrito
-  `removeFromCart`: Eliminar productos del carrito
-  `updateQuantity`: Actualizar cantidad de un producto
-  `clearCart`: Vaciar el carrito
-  `getTotalPrice`: Calcular precio total
-  `getTotalItems`: Contar items totales
-  Persistencia con `localStorage`

### 2. **TanStack Query** (`src/services/api.ts`)
-  `getAll`: Obtener todos los productos
-  `getById`: Obtener producto por ID
-  `getCategories`: Obtener lista de categorías
-  `getByCategory`: Obtener productos por categoría

### 3. **Componentes**
-  `ProductCard`: Tarjeta de producto con botón "Agregar al carrito" funcional
-  `CartItem`: Item del carrito con controles de cantidad
-  Navegación global con contador de items

### 4. **Páginas**
-  Página de inicio con diseño
-  Lista de productos con grid responsivo
-  Carrito de compras funcional
-  Lista de categorías
-  **Checkout con formulario validado** - React Hook Form + Zod

## TAREAS A COMPLETAR

### **Tarea 1: Implementar "Agregar al Carrito" en la Página de Detalle del Producto** 

**Archivo**: `src/routes/products/$productId.tsx`

**Descripción**: En la página de detalle del producto, el botón "Agregar al Carrito" tiene un `alert` de placeholder. Debes implementar la funcionalidad real.

**Referencia**: Mira cómo se implementó en `src/components/ProductCard.tsx` (línea 26-27).

**Pasos**:
1. Importa el hook `useCartStore` 
2. Obtén la función `addToCart` del store
3. En el `onClick` del botón, llama a `addToCart(product)`
4. BONUS: Agrega un estado de feedback visual (ej: "¡Agregado!" temporalmente)

---

### **Tarea 2: Agregar Botón "Agregar al Carrito" en Productos por Categoría** 

**Archivo**: `src/routes/categories/$category.tsx`

**Descripción**: Los productos listados por categoría no tienen botón para agregar al carrito. Hay un comentario TODO en la línea 49.

**Referencia**: Observa el componente `ProductCard` en `src/components/ProductCard.tsx` para ver cómo se implementa.

**Pasos**:
1. Importa `useCartStore`
2. Obtén la función `addToCart`
3. Agrega un botón similar al de `ProductCard`
4. BONUS: Considera extraer esto a un componente reutilizable o usar directamente el `ProductCard`

---

### **Tarea 3: Implementar Filtros de Productos** 

**Archivo**: `src/routes/products/index.tsx`

**Descripción**: Agrega la capacidad de filtrar productos por rango de precio y/o búsqueda por título.

**Pasos**:
1. Crea estados locales con `useState` para los filtros (ej: `minPrice`, `maxPrice`, `searchTerm`)
2. Filtra el array de `products` antes de hacer el `.map()`
3. Agrega inputs/controles en la UI para que el usuario modifique los filtros
4. BONUS: Agrega un botón "Limpiar filtros"

**Ejemplo de filtrado**:
```typescript
const filteredProducts = products?.filter((product) => {
  const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
  const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesPrice && matchesSearch;
});
```

---

### **Tarea 4: Crear una Página de "Favoritos"** 

**Nuevos archivos**: 
- `src/store/favoritesStore.ts`
- `src/routes/favorites/index.tsx`

**Descripción**: Implementa un sistema de favoritos similar al carrito pero para productos que el usuario quiere guardar.

**Pasos**:

1. **Crear el Store** (`src/store/favoritesStore.ts`):
   - Usa como referencia `cartStore.ts`
   - Debe tener: `favorites: Product[]`, `addFavorite`, `removeFavorite`, `isFavorite`
   - Usa `persist` para guardar en localStorage

2. **Crear la Ruta** (`src/routes/favorites.tsx`):
   - Usa como referencia `cart.tsx`
   - Muestra los productos favoritos en un grid
   - Si está vacío, muestra un mensaje similar al carrito vacío

3. **Agregar Botón de Favoritos**:
   - En `ProductCard`, agrega un botón con un ícono de corazón (❤️)
   - Debe cambiar de color si el producto está en favoritos
   - Al hacer click, alterna entre agregar/quitar de favoritos

4. **Agregar Link en Navegación**:
   - En `__root.tsx`, agrega un link a `/favorites` en la navegación
   - BONUS: Agrega un contador de favoritos

---

### **Tarea 5: Implementar Ordenamiento de Productos** 

**Archivo**: `src/routes/products/index.tsx`

**Descripción**: Permite al usuario ordenar los productos por diferentes criterios.

**Pasos**:
1. Crea un estado para el criterio de ordenamiento (`sortBy`)
2. Crea un `<select>` con opciones:
   - Precio: Menor a Mayor
   - Precio: Mayor a Menor
   - Mejor Valorados
   - Más Reseñas
3. Ordena el array de productos según el criterio seleccionado
4. Renderiza los productos ordenados

**Ejemplo**:
```typescript
const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
  if (sortBy === 'price-asc') return a.price - b.price;
  if (sortBy === 'price-desc') return b.price - a.price;
  // ... más criterios
  return 0;
});
```

---

### **Tarea 6: Agregar Loading y Error States Mejorados** 

**Archivos**: Varios (donde haya queries de TanStack Query)

**Descripción**: Mejora la UX de los estados de carga y error.

**Referencia**: Ya existe `ProductSkeleton.tsx` como ejemplo.

**Pasos**:
1. Crea un componente `LoadingSpinner.tsx` reutilizable
2. Crea un componente `ErrorMessage.tsx` reutilizable
3. Reemplaza los mensajes simples de "Cargando..." y "Error..." por estos componentes
4. BONUS: Usa `ProductSkeleton` en la página de productos mientras cargan

---

### **Tarea 7 (AVANZADA): Implementar Paginación en Productos** 

**Archivo**: `src/routes/products/index.tsx`

**Descripción**: La API devuelve todos los productos de una vez. Implementa paginación del lado del cliente.

**Pasos**:
1. Define cuántos productos mostrar por página (ej: 8)
2. Crea estado para la página actual (`currentPage`)
3. Calcula qué productos mostrar según la página
4. Crea controles de navegación (Anterior/Siguiente y números de página)
5. BONUS: Mantén la página en la URL usando search params de TanStack Router

---

## Consejos

1. **Estudia el código existente**: Antes de empezar cada tarea, lee y entiende cómo está implementada una funcionalidad similar.

2. **No reinventes la rueda**: Si algo ya está implementado en otro lugar, cópialo y adáptalo.

3. **Lee la documentación**:
   - [TanStack Router](https://tanstack.com/router)
   - [TanStack Query](https://tanstack.com/query)
   - [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

4. **Usa las DevTools**: El proyecto incluye React Query DevTools y TanStack Router DevTools para debugging.

5. **Commit frecuentemente**: Haz commits después de completar cada tarea.

6. **Prueba tu código**: Asegúrate de que todo funciona antes de pasar a la siguiente tarea.

## Conceptos que Practicarás

-  Estado global con Zustand
-  Persistencia en localStorage
-  Fetching de datos con TanStack Query
-  Cache y gestión de estado del servidor
-  Enrutamiento con TanStack Router
-  Parámetros de ruta dinámicos
-  TypeScript con React
-  Componentes reutilizables
-  Hooks personalizados
-  Manejo de estados de loading y error
-  Formularios con validaciones (React Hook Form + Zod)

---

### **Tarea 8: Implementar Formulario de Registro con Validaciones** 

**Archivos**: 
- `src/routes/register/index.tsx` (crear)
- `src/types/register.ts` (crear)

**Descripción**: Crea un formulario de registro de usuario usando React Hook Form y Zod para validaciones, siguiendo el ejemplo del formulario de checkout.

**Referencia**: Revisa `src/routes/checkout/index.tsx` y `src/types/checkout.ts` para ver cómo implementar formularios con validaciones.

**Pasos**:

1. **Crear el esquema de validación** (`src/types/register.ts`):

2. **Crear el formulario** (`src/routes/register/index.tsx`):
   - Usa `useForm` de React Hook Form
   - Configura `zodResolver` con tu schema
   - Implementa campos: username, email, password, confirmPassword
   - Muestra errores de validación debajo de cada campo
   - Agrega un checkbox "Acepto recibir novedades"

3. **Agregar al navbar**:
   - En `__root.tsx`, agrega un link a `/register`

4. **BONUS**:
   - Agrega validación de fortaleza de contraseña visual
   - Implementa un indicador de campos completados
   - Agrega confirmación visual al enviar

**Recursos**:
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

### **Tarea 9 (OPCIONAL): Mejorar los Estilos y Animaciones** 

**Archivos**: Varios componentes + `src/index.css`

**Descripción**: Mejora la experiencia visual agregando animaciones, transiciones y efectos hover más sofisticados.

**Pasos**:

1. **Agregar animaciones de entrada**:
   - Usa la clase `animate-fadeIn` (ya definida en CSS) en productos cuando cargan
   - Agrega `transition-all duration-300` a elementos interactivos

2. **Mejorar cards de productos**:
   ```typescript
   // En ProductCard, agrega la clase card-hover al div principal
   <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
   ```

3. **Agregar efectos a botones**:
   - Agrega `transform hover:scale-105 active:scale-95` a botones principales
   - Usa `transition-transform duration-200` para suavizar

4. **Skeleton loading**:
   - Crea un componente `ProductSkeleton.tsx` con animación de pulso
   - Muéstralo mientras cargan los productos

5. **Efectos de badge**:
   - En el contador del carrito, agrega `animate-bounce` cuando cambia
   - Usa `transition-all` para suavizar cambios de cantidad

6. **Hover en imágenes**:
   ```typescript
   <img 
     className="w-full h-48 object-contain p-4 bg-white transition-transform duration-300 hover:scale-110"
   />
   ```

**Ideas adicionales**:
- Agrega `backdrop-blur-sm` al navbar para efecto glass
- Usa `group` y `group-hover:` para efectos coordinados
- Implementa dark mode con `dark:` variants
- Agrega gradientes con `bg-gradient-to-r`

**Recursos**:
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
- [Tailwind CSS Transforms](https://tailwindcss.com/docs/scale)
- [Tailwind CSS Transitions](https://tailwindcss.com/docs/transition-property)

---

