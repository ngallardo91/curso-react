import './App.css';
import { useState } from 'react';

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

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1
const [numeroJugador, setNumeroJugador] = useState("");
  const [numeroMaquina, setNumeroMaquina] = useState(
    Math.floor(Math.random() * maximo) + 1
  );
  const [resultado, setResultado] = useState("");
  const [esCorrecto, setEsCorrecto] = useState(false);

  const handleChange = (e) => {
    setNumeroJugador(Number(e.target.value));
  };

  const verificarNumero = () => {
    if (!numeroJugador) {
      setResultado("Ingresá un número válido");
      setEsCorrecto(false);
      return;
    }

    if (numeroJugador === numeroMaquina) {
      setResultado(`¡Correcto! El número era ${numeroMaquina}`);
      setEsCorrecto(true);
    } else {
      setResultado(`Incorrecto. El número era ${numeroMaquina}`);
      setEsCorrecto(false);
    }

    // Generar siguiente número
    const nuevo = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevo);
  };
  return (
  <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          min="1"
          max={maximo}
          value={numeroJugador}
          onChange={handleChange}
          placeholder="Ingresa un número del 1 al 10"
        />

        <button type="button" onClick={verificarNumero}>
          Adivinar
        </button>
      </form>

      <div className={`resultado ${esCorrecto ? "exito" : "error"}`}>
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

