
import "./style.css";
import typescriptLogo from './typescript.svg?url';
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

// Render original del template
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <div>
    <atps://vite.dev
      ${viteLogo}
    </a>
   
    </a>
    <h1></h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>

    <!-- 🔸 Bloque del juego debajo del contenido existente -->
    <section id="juego" class="app-card">
      <header>
        <h2>Juego de Adivinanza</h2>
      </header>

      <form id="juego-form">
        <input
          id="juego-input"
          type="number"
          min="1"
          max="10"
          placeholder="Ingresa un número del 1 al 10"
        />
        <button id="juego-boton" type="button">Adivinar</button>
      </form>

      <div id="juego-resultado" class="resultado" aria-live="polite">
        Ingresa un número del 1 al 10.
      </div>

      <footer class="juego-footer">¡Intenta adivinar el número entre 1 y 10!</footer>
    </section>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

/* ===========================
   LÓGICA DEL JUEGO (TypeScript)
   =========================== */

// 🎯 Estados requeridos por la consigna
let numeroJugador: string = "";                 // lo que ingresa el usuario (como string del input)
let numeroMaquina: number = randomEntre(1, 10); // número aleatorio actual
let resultado: string = "Ingresa un número del 1 al 10.";
let esCorrecto: boolean | null = null;          // null: sin intento; true: acierto; false: fallo

// Referencias al DOM
const input = document.querySelector<HTMLInputElement>("#juego-input")!;
const boton = document.querySelector<HTMLButtonElement>("#juego-boton")!;
const resultadoDiv = document.querySelector<HTMLDivElement>("#juego-resultado")!;

// Manejo del input: actualizar numeroJugador en cada cambio
input.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  numeroJugador = target.value;
});

// Verificación al click
boton.addEventListener("click", () => {
  const elegido = Number(numeroJugador);

  // Validación mínima: entero en [1..10]
  const esValido =
    Number.isInteger(elegido) && elegido >= 1 && elegido <= 10;

  if (!esValido) {
    resultado = "⚠️ Ingresa un número entero entre 1 y 10.";
    esCorrecto = false;
    renderResultado();
    return;
  }

  // Comparar con numeroMaquina
  esCorrecto = elegido === numeroMaquina;

  if (esCorrecto) {
    resultado = `🎉 ¡Acertaste! Elegiste ${elegido} y la máquina tenía ${numeroMaquina}.`;
  } else {
    resultado = `❌ Fallaste. Elegiste ${elegido}, la máquina tenía ${numeroMaquina}. ¡Sigue intentando!`;
  }

  // Generar nuevo número para el próximo intento
  numeroMaquina = randomEntre(1, 10);

  // Opcional: limpiar input
  // numeroJugador = "";
  // input.value = "";

  // Actualizar UI
  renderResultado();
});

// Renderiza el mensaje y aplica la clase CSS dinámica
function renderResultado() {
  resultadoDiv.textContent = resultado;

  // Quitar clases previas
  resultadoDiv.classList.remove("resultado--correcto", "resultado--incorrecto");

  // Aplicar clase según esCorrecto
  if (esCorrecto === true) {
    resultadoDiv.classList.add("resultado--correcto");
  } else if (esCorrecto === false) {
    resultadoDiv.classList.add("resultado--incorrecto");
  }
}

// Utilidad: aleatorio en [min..max] inclusive
function randomEntre(min: number, max: number): number {
  const rango = max - min + 1;
  return Math.floor(Math.random() * rango) + min;
}



