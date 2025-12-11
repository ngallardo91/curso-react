import { useState } from 'react';
import './App.css';

function Header() {
  return (
    <header>
      <h1>Juego de Adivinanza</h1>
    </header>
  );
}

function Juego({ maximo }) {
  const [numeroJugador, setNumeroJugador] = useState('');
  const [numeroMaquina, setNumeroMaquina] = useState(() =>
    Math.floor(Math.random() * maximo) + 1
  );
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(null);
  const [intentos, setIntentos] = useState(0);

  const manejarCambio = (evento) => {
    const valor = evento.target.value;
    setNumeroJugador(valor === '' ? '' : Number(valor));
  };

  const verificarNumero = () => {
    if (numeroJugador === '' || Number.isNaN(numeroJugador)) {
      setResultado('Ingresá un número válido antes de jugar.');
      setEsCorrecto(false);
      return;
    }

    const acierto = numeroJugador === numeroMaquina;
    setEsCorrecto(acierto);
    setResultado(
      acierto
        ? `¡Correcto! El número era ${numeroMaquina}.`
        : `Fallaste. La máquina eligió ${numeroMaquina}.`
    );
    setIntentos((prev) => prev + 1);

    const nuevoNumero = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevoNumero);
  };

  const reiniciarJuego = () => {
    setNumeroJugador('');
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    setResultado('');
    setEsCorrecto(null);
    setIntentos(0);
  };

  const claseResultado =
    esCorrecto === null
      ? 'resultado'
      : `resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`;

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1

  return (
    <div>
      <form>
        {/* TODO: Input controlado para ingresar el número */}
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder="Ingresa un número del 1 al 10"
          value={numeroJugador}
          onChange={manejarCambio}
        />
        <button type="button" onClick={verificarNumero}>
          Adivinar
        </button>
        <button
          type="button"
          className="boton-secundario"
          onClick={reiniciarJuego}
        >
          Reiniciar
        </button>
      </form>

      <div className="estadisticas">
        Intentos realizados: <strong>{intentos}</strong>
      </div>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className={claseResultado}>
        {resultado || 'Ingresa un número y probá suerte.'}
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

