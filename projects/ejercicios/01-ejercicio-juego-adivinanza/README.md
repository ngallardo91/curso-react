# 🎯 Ejercicio React - Juego de Adivinanza

En este ejercicio vas a practicar **React**, **useState** y **eventos**, completando un pequeño juego interactivo.

---

## 🎮 Objetivo
El jugador debe ingresar un número del 1 al 10.  
La aplicación generará un número aleatorio.  
Si ambos coinciden → ¡el jugador gana!  
Si no → puede seguir intentando, ya que se genera un nuevo número automáticamente.

---

## 🧩 Tareas a completar

1. **Crear los estados necesarios con useState**:
   - `numeroJugador`
   - `numeroMaquina`
   - `resultado`
   - `esCorrecto`

2. **Implementar el manejo del input**:
   - Escuchar el evento `onChange`
   - Guardar el número ingresado en `numeroJugador`

3. **Verificar si el número es correcto** al hacer clic en el botón:
   - Comparar el número ingresado con el número generado.
   - Mostrar un mensaje diferente si acierta o falla.
   - Generar un nuevo número aleatorio con `Math.floor(Math.random() * maximo) + 1`

4. **Mostrar el mensaje en pantalla**, aplicando una clase CSS diferente si el jugador acierta.

---

## 🚀 Cómo ejecutar el proyecto

1. Crear el proyecto con Vite:
   ```bash
   npm create vite@latest juego-adivinanza --template react
   ```

2. Reemplazar los archivos del directorio `src` con los de este ejercicio.

3. Instalar dependencias y ejecutar:
   ```bash
   npm install
   npm run dev
   ```

---

## 💡 Pistas

- Recordá usar `Number(e.target.value)` para convertir el input a número.
- Podés usar operadores ternarios para cambiar el estilo o mensaje dinámicamente.

---

## 🏁 Extra (Opcional)
Agregá un contador de intentos o un botón para reiniciar el juego.
