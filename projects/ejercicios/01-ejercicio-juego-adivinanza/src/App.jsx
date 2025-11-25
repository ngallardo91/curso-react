import { useState } from 'react'
import './App.css'

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

  const [numeroJugador, setNumeroJugador] = useState('');
  const [numeroMaquina, setNumeroMaquina] = useState(() => Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [mostrarReintento, setMostrarReintento] = useState(false);

  const ResultadoAdivinanza = () => {
    const nuevoNumero = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevoNumero);

    const intento = parseInt(numeroJugador, 10);
    console.log(`Número de la máquina: ${nuevoNumero}, Número del jugador: ${intento}`);
    if (intento === nuevoNumero) {
      setResultado('¡Correcto! Adivinaste el número ');
      setEsCorrecto(true);
    } else {
      setResultado('Como dijo José Luis Félix Chilavert... Tú no has ganado nada!.');
      setEsCorrecto(false);
    }
    setMostrarReintento(true);
  };
  const reiniciarJuego = () => {
    setNumeroJugador('');
    setResultado('');
    setEsCorrecto(null);
    setMostrarReintento(false);
  };



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
          onChange={(e) => setNumeroJugador(e.target.value)}
        />
        <button type="button" onClick={ResultadoAdivinanza} >Probar mi suerte</button>
      </form>
      {esCorrecto === true && (
        <div className="resultado">
          <strong className="mensaje-acierto">{resultado}</strong>
        </div>
      )}

      {esCorrecto === false && (
        <div className="resultado-error">
          <div className="mensaje-error">
            <strong>{resultado}</strong>
          </div>
          <div className="imagen-error">
            <img src="/chila.jpg" alt="Fallaste" />
          </div>
        </div>
      )}

      {mostrarReintento && (
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={reiniciarJuego}>
            Volver a intentarlo
          </button>
        </div>
      )}
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