# Tutorial Completo de Tailwind CSS

Este proyecto es una guía interactiva completa de Tailwind CSS con ejemplos prácticos para aprender la tecnología.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

## 📚 Contenido del Tutorial

### 1. **Introducción**
- ¿Qué es Tailwind CSS?
- Características clave
- Errores típicos
- Ventajas y desventajas

### 2. **Conceptos Básicos**
- **Colores**: Sistema de colores con opacidad
- **Tipografía**: Tamaños, pesos, alineación
- **Spacing**: Padding, margin, valores negativos
- **Borders**: Estilos, grosores, bordes redondeados
- **Valores Arbitrarios**: Personalización con `[]`

### 3. **Variantes (Estados Interactivos)**
- `hover:` - Estados al pasar el mouse
- `focus:` - Estados de foco en inputs
- `active:` - Estados al hacer click
- Combinaciones de variantes
- Tipos de cursor

### 4. **Layout & Flexbox**
- Flexbox: `flex`, `justify-*`, `items-*`
- Direcciones: `flex-row`, `flex-col`
- Spacing: `space-x-*`, `space-y-*`, `gap-*`
- Grid: `grid`, `grid-cols-*`
- Z-index y posicionamiento

### 5. **Gradientes y Efectos Visuales**
- Gradientes lineales: `bg-gradient-to-*`
- Gradientes con múltiples colores (via)
- Sombras: `shadow-*` con colores personalizados
- Backdrop blur: Efecto de cristal esmerilado
- Drop shadows personalizados

### 6. **Responsive Design**
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Mobile-first approach
- Ocultar/mostrar elementos según breakpoint
- Layouts responsive con Flexbox y Grid

### 7. **Proyecto Final**
- Tarjeta de perfil profesional
- Integración de todos los conceptos
- Iconos de redes sociales
- Efectos interactivos avanzados

## 🎯 Conceptos Clave Aprendidos

### Utility-First CSS
Tailwind usa clases de utilidad pequeñas y reutilizables:
```html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  ¡Hola Tailwind!
</div>
```

### Responsive Design
```html
<div class="text-sm md:text-lg lg:text-xl">
  Texto que crece con el viewport
</div>
```

### Estados Interactivos
```html
<button class="bg-blue-500 hover:bg-blue-600 active:scale-95">
  Click me
</button>
```

### Valores Arbitrarios
```html
<div class="w-[137px] bg-[#1e3a8a] text-[18px]">
  Valores personalizados
</div>
```

## 💡 Tips y Mejores Prácticas

1. **No usar interpolación de strings para clases dinámicas**
   ```tsx
   // ❌ Mal
   className={`text-${color}-500`}
   
   // ✅ Bien
   className={color === 'red' ? 'text-red-500' : 'text-blue-500'}
   ```

2. **Usar la configuración para valores personalizados**
   - Extiende el tema en `tailwind.config.js`
   - Define colores, fonts, y spacing personalizados

3. **Aprovechar las herramientas de desarrollo**
   - Tailwind CSS IntelliSense (extensión VS Code)
   - Autocompletado de clases
   - Preview de colores en el editor

4. **Componentes reutilizables**
   - Extrae componentes de React para código repetitivo
   - Usa `@apply` en CSS solo cuando sea necesario

## 🎨 Sistema de Colores

Tailwind incluye una paleta completa:
- `slate`, `gray`, `zinc`, `neutral`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`, `green`
- `emerald`, `teal`, `cyan`, `sky`, `blue`
- `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

Cada color tiene escalas de 50 a 950:
- `bg-blue-500` - Azul medio
- `bg-blue-100` - Azul muy claro
- `bg-blue-900` - Azul muy oscuro

### Opacidad
```html
<div class="bg-blue-500/50">50% de opacidad</div>
<div class="bg-blue-500/25">25% de opacidad</div>
```

## 📐 Sistema de Spacing

Tailwind usa una escala consistente:
- `p-0` = `0`
- `p-1` = `0.25rem` (4px)
- `p-2` = `0.5rem` (8px)
- `p-4` = `1rem` (16px)
- `p-8` = `2rem` (32px)
- `p-16` = `4rem` (64px)

### Variantes de Spacing
- `p-*` - padding en todos los lados
- `px-*` - padding horizontal (left + right)
- `py-*` - padding vertical (top + bottom)
- `pt-*`, `pr-*`, `pb-*`, `pl-*` - padding individual

Lo mismo aplica para margin (`m-*`)

## 🔄 Transiciones y Animaciones

```html
<button class="transition-all duration-300 hover:scale-110">
  Animado
</button>

<div class="transition-colors hover:bg-blue-600">
  Transición suave
</div>
```

## 📱 Breakpoints

```
sm:  640px  (tablets pequeñas)
md:  768px  (tablets)
lg:  1024px (laptops)
xl:  1280px (desktops)
2xl: 1536px (pantallas grandes)
```

## 🔗 Recursos Adicionales

- [Documentación Oficial](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/) - Playground online
- [Tailwind UI](https://tailwindui.com/) - Componentes premium
- [Heroicons](https://heroicons.com/) - Iconos gratuitos

## 🛠️ Configuración del Proyecto

### Tailwind CSS v4 con Vite

Este proyecto usa Tailwind CSS v4, la versión más reciente:

1. **Instalación**:
   ```bash
   npm install -D tailwindcss @tailwindcss/vite
   ```

2. **Configuración en `vite.config.ts`**:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   
   export default defineConfig({
     plugins: [react(), tailwindcss()]
   })
   ```

3. **Import en CSS**:
   ```css
   @import "tailwindcss";
   ```

## 📝 Ejercicios Sugeridos

1. **Crear una navbar responsive**
   - Desktop: menú horizontal
   - Mobile: menú hamburguesa

2. **Diseñar un sistema de cards**
   - Grid responsive
   - Efectos hover
   - Badges de estado

3. **Formulario estilizado**
   - Estados focus
   - Validación visual
   - Mensajes de error

4. **Landing page**
   - Hero section con gradientes
   - Secciones responsive
   - Call-to-action buttons

## 🎓 Para los Alumnos

Este tutorial cubre todos los conceptos fundamentales de Tailwind CSS. Los ejemplos son interactivos, así que:

1. **Navega entre las secciones** usando el menú superior
2. **Inspecciona el código** en `src/App.tsx` para ver la implementación
3. **Modifica los ejemplos** para experimentar
4. **Prueba el responsive** redimensionando la ventana del navegador
5. **Usa las DevTools** para ver las clases aplicadas

### Tareas Prácticas

- [ ] Modifica los colores del proyecto final
- [ ] Agrega tu propio breakpoint personalizado
- [ ] Crea un nuevo componente usando todos los conceptos
- [ ] Implementa animaciones con `@keyframes`
- [ ] Personaliza el sistema de spacing

¡Feliz aprendizaje! 🚀
