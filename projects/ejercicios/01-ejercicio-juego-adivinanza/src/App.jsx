import "./App.css";
import React, { useState } from "react";

function Header() {
  return (
    <header>
      <h1>Juego de Adivinanza</h1>
    </header>
  );
}

function Juego({ maximo }) {
  // TODO: Crear estados con useState para:
  // - numeroJugador (el número que ingresa el jugador)
  // - numeroMaquina (el número aleatorio generado)
  // - resultado (el mensaje de resultado)
  // - esCorrecto (booleano para indicar si adivinó o no)
  const [numeroJugador, setNumJugador] = useState("");
  const [numeroMaquina, setNumMaquina] = useState(
    Math.floor(Math.random() * maximo) + 1
  );
  const [resultado, setResultado] = useState("");
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [numeroContador, setNumeroContador] = useState(0);
  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.
  const handleChange = (e) => {
    setNumJugador(Number(e.target.value)); // Update state with the new input value
  };
  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1

  const verificarNumero = () => {
    if (numeroJugador < 1 || numeroJugador > maximo) {
      setResultado(`Debes ingresar un número entre 1 y ${maximo}.`);
      setEsCorrecto(false);
      return; // No sigue evaluando ni cambia numeroMaquina
    }
    const acumulador = numeroContador + 1;
    setNumeroContador(acumulador);
    numeroJugador === numeroMaquina
      ? (setResultado(
          `Correcto el numero era ${numeroMaquina}, intento numero: ${acumulador}`
        ),
        setEsCorrecto(true))
      : (setResultado(
          `Fallaste, el numero era ${numeroMaquina}, intento numero: ${acumulador}`
        ),
        setEsCorrecto(false));
    setNumMaquina(Math.floor(Math.random() * maximo) + 1);
  };

  const Reiniciar = () => {
    setNumJugador("");
    setResultado("");
    setNumeroContador(0);
  };

  return (
    <div>
      <form className="claseForm" onSubmit={(e) => e.preventDefault()}>
        {/* TODO: Input controlado para ingresar el número */}
        <input
          type="number"
          min="1"
          max={maximo}
          value={numeroJugador}
          onChange={handleChange}
          placeholder={`Ingresa un número del 1 al ${maximo}`}
        />
        <button type="button" onClick={verificarNumero}>
          Adivinar
        </button>
        <button type="button" onClick={Reiniciar}>
          Reiniciar
        </button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className={`resultado ${esCorrecto ? "correcto" : "incorrecto"}`}>
        {/* Mostrar el mensaje del resultado aquí */}
        {resultado}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Juego maximo={10} />
      <footer>¡Intenta adivinar el número entre 1 y 10!</footer>
    </div>
  );
}

export default App;
