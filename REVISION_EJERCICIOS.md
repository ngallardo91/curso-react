# 📋 Revisión de Ejercicios 1 y 2 - Curso de React

Este documento contiene la revisión de los ejercicios entregados por los alumnos a través de Pull Requests.

---

## Ejercicio 1: Juego de Adivinanza
**Objetivos esperados:**
- Crear estados con `useState`: `numeroJugador`, `numeroMaquina`, `resultado`, `esCorrecto`
- Implementar manejo del input con `onChange`
- Verificar si el número es correcto al hacer clic
- Mostrar mensaje con clase CSS dinámica

## Ejercicio 2: Gestor de Tareas
**Objetivos esperados:**
- Completar la función `addTask` con ID incremental
- Completar la función `toggleTask` para cambiar `completed`
- Opcionalmente crear tipos para filtro y prioridad

---

## 📊 Revisión por Alumno

### PR #2 - Matías Dodero (mdodero)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente (`numeroJugador`, `numeroMaquina`, `resultado`, `esCorrecto`)
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ✅ Mensaje con clase CSS dinámica
- 🌟 **Extra:** Agregó contador de intentos y botón de reinicio
- ⚠️ **Observación menor:** Tiene un `console.log` de debug que debería removerse en producción

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente con `map`
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ✅ Creó tipos `TaskPriority` y `TaskFilter` en `task.ts`
- 🌟 **Extra:** Refactorizó los componentes para usar los nuevos tipos

**Calificación:** ⭐⭐⭐⭐⭐ Excelente trabajo

---

### PR #3 - Franco Ramponi (framponi)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente
- ✅ Manejo del input con validación de caracteres (bloquea e, E, +, -, ., ,)
- ✅ Verificación del número implementada
- ✅ Mensaje con clase CSS dinámica (`acierto`/`error`)
- ⚠️ **Bug potencial:** La comparación se hace con el número generado nuevo (`random`) en lugar del anterior, lo cual está bien
- ✅ Estilos CSS añadidos para los resultados
- ⚠️ **Observación:** Tiene `console.log` de debug

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ⚠️ **Observación:** Tiene `console.log` de debug en el componente principal
- ⚠️ **Observación menor:** Añadió `patch-package` como dependencia pero no parece usarla

**Calificación:** ⭐⭐⭐⭐ Muy buen trabajo

---

### PR #4 - Sebastián Maeck (smaeck)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente, incluyendo `numeroContador`
- ✅ Manejo del input implementado
- ✅ Verificación del número con validación de rango (1 a máximo)
- ✅ Mensaje con clase CSS dinámica (`correcto`/`incorrecto`)
- 🌟 **Extra:** Contador de intentos implementado
- 🌟 **Extra:** Botón de reinicio implementado
- ✅ Buenos estilos CSS añadidos

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente
- ✅ `addTask` implementado con función `generarNuevoId` que usa `Math.max`
- ✅ Código limpio y bien organizado
- ⚠️ **Observación menor:** Comentó el `StrictMode` en `main.tsx` (no recomendado para desarrollo)

**Calificación:** ⭐⭐⭐⭐⭐ Excelente trabajo

---

### PR #5 - Maximiliano Arruñada (marruñada)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ✅ Mensaje con clase CSS dinámica
- 🌟 **Extra:** Contador de intentos
- 🌟 **Extra:** Botón de reinicio
- ⚠️ **Mejora sugerida:** El placeholder del input es dinámico, buen detalle
- ✅ Muy buenos estilos CSS añadidos con diseño moderno

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente con función de actualización del estado
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- 🌟 **Extra:** Creó tipos `TaskPriority` y `TaskFilter`
- 🌟 **Extra:** Refactorizó componentes para usar los tipos

**Calificación:** ⭐⭐⭐⭐⭐ Excelente trabajo, muy completo

---

### PR #6 - Ramiro Palavecino (rpalavecino) - Fork: tresvi
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente, incluyendo `error` e `intentos`
- ✅ Manejo del input implementado
- ✅ Verificación del número con `useEffect`
- ⚠️ **Observación:** Usa `useEffect` para verificar, lo cual funciona pero es un patrón diferente
- ⚠️ **Bug potencial:** La validación podría mejorarse para evitar comparaciones con valores vacíos
- 🌟 **Extra:** Límite de intentos (MAX_INTENTOS = 5)
- 🌟 **Extra:** Botón de reinicio
- ✅ Buenos estilos CSS para inputs

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado (aunque usa mutación directa con spread, funciona)
- ⚠️ **Observación:** Usa `alert` para errores, mejor sería un mensaje en UI
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ✅ Estilos mejorados para selects
- ⚠️ **Observación menor:** Corrigió el título del HTML de "01-ejercicio" a "02-ejercicio"

**Calificación:** ⭐⭐⭐⭐ Muy buen trabajo

---

### PR #7 - Javier Boero (jboero)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente, incluyendo `mostrarReintento`
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ✅ Mensaje con clases CSS dinámicas (`mensaje-acierto`, `resultado-error`)
- 🌟 **Extra:** Imagen personalizada de Chilavert para errores 😄
- 🌟 **Extra:** Botón "Volver a intentarlo"
- ✅ Estilos CSS con animaciones (keyframes)
- ⚠️ **Observación:** Tiene `console.log` de debug

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente con `map`
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ⚠️ **Observación:** Tiene `console.log` de debug
- ⚠️ **Observación:** Comentó las tareas iniciales en el estado
- ⚠️ **Observación menor:** `patch-package` en dependencias de producción en lugar de dev

**Calificación:** ⭐⭐⭐⭐ Muy buen trabajo, creativo con los extras

---

### PR #8 - Marcelo Quiroga (mquiroga) - Fork: MarceloHarp
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ⚠️ **Bug:** Compara `numeroJugador === numeroMaquina` antes de actualizar `numeroMaquina`, debería comparar con el nuevo número generado
- ✅ Muestra el resultado con el nuevo número
- ⚠️ **Observación:** Tiene `console.log` de debug
- ⚠️ **Mejora sugerida:** Cambiar el texto del botón de "Verificar" a "Adivinar" para consistencia

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente
- ✅ `addTask` implementado con ID incremental (`tasks.length + 1`)
- ⚠️ **Bug potencial:** El cálculo del ID con `tasks.length + 1` puede causar IDs duplicados si se eliminan tareas. Mejor usar `Math.max(...tasks.map(t => t.id)) + 1`

**Calificación:** ⭐⭐⭐ Buen trabajo, con algunos bugs menores a corregir

---

### PR #9 - Walter Pasinato (wpasinato) - Fork: t35pas
**Estado:** ⚠️ Solo Ejercicio 1 completado

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ✅ Mensaje mostrado correctamente
- ⚠️ **Observación:** Tiene `console.log` de debug

**Ejercicio 2 - Gestor de Tareas:**
- ❌ No completado

**Calificación:** ⭐⭐⭐ Ejercicio 1 correcto, falta ejercicio 2

---

### PR #10 - Lorena González (lgonzalez) - Fork: lilybel81
**Estado:** ⚠️ Solo Ejercicio 2 completado

**Ejercicio 1 - Juego de Adivinanza:**
- ❌ No completado

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente con `map`
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ✅ Código limpio y sencillo

**Calificación:** ⭐⭐⭐ Ejercicio 2 correcto, falta ejercicio 1

---

### PR #11 - Ian Cinti (icinti)
**Estado:** ✅ Ejercicios 1 y 2 completados

**Ejercicio 1 - Juego de Adivinanza:**
- ✅ Estados creados correctamente
- ✅ Manejo del input implementado
- ✅ Verificación del número implementada
- ✅ Mensaje con clases CSS dinámicas
- ⚠️ **Bug potencial:** El formulario no tiene `onSubmit` con `e.preventDefault()`, pero usa `type="button"` lo cual está bien
- ✅ Buen manejo de estados

**Ejercicio 2 - Gestor de Tareas:**
- ✅ `toggleTask` implementado correctamente
- ✅ `addTask` implementado con ID incremental usando `Math.max`
- ✅ Código limpio

**Calificación:** ⭐⭐⭐⭐ Muy buen trabajo

---

## 📈 Resumen General

| Alumno | PR | Ejercicio 1 | Ejercicio 2 | Extras | Calificación |
|--------|-----|-------------|-------------|--------|--------------|
| Matías Dodero | #2 | ✅ | ✅ | Tipos, contador | ⭐⭐⭐⭐⭐ |
| Franco Ramponi | #3 | ✅ | ✅ | Validación input | ⭐⭐⭐⭐ |
| Sebastián Maeck | #4 | ✅ | ✅ | Contador, reinicio | ⭐⭐⭐⭐⭐ |
| Maximiliano Arruñada | #5 | ✅ | ✅ | Tipos, diseño | ⭐⭐⭐⭐⭐ |
| Ramiro Palavecino | #6 | ✅ | ✅ | Límite intentos | ⭐⭐⭐⭐ |
| Javier Boero | #7 | ✅ | ✅ | Imagen creativa | ⭐⭐⭐⭐ |
| Marcelo Quiroga | #8 | ⚠️ Bug | ⚠️ Bug ID | - | ⭐⭐⭐ |
| Walter Pasinato | #9 | ✅ | ❌ | - | ⭐⭐⭐ |
| Lorena González | #10 | ❌ | ✅ | - | ⭐⭐⭐ |
| Ian Cinti | #11 | ✅ | ✅ | - | ⭐⭐⭐⭐ |

---

## 🔧 Recomendaciones Generales

1. **Remover `console.log` de debug** antes de entregar
2. **Usar `Math.max()` para IDs** en lugar de `length + 1` para evitar duplicados
3. **Mantener `StrictMode`** en desarrollo para detectar problemas
4. **Considerar validaciones** de entrada para mejorar UX
5. **Agregar `patch-package` a devDependencies** si se usa, no a dependencies

---

## ✨ Puntos Destacados

- Varios alumnos implementaron features extras como contador de intentos y botón de reinicio
- Buenos estilos CSS con clases dinámicas basadas en el estado
- Uso correcto de TypeScript para tipos personalizados
- Creatividad en las soluciones (imagen de Chilavert 😄)

¡Excelente trabajo del grupo en general! 🎉
