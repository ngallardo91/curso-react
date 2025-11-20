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
  
  // ESTADOS
  const [numeroMaquina, setNumeroMaquina] = useState(Math.floor(Math.random() * maximo) + 1);
  const [numeroJugador, setNumeroJugador] = useState('');
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(null);
  const [intentos, setIntentos] = useState(0); // Arranca en 0

  const manejarCambio = (e) => {
    setNumeroJugador(e.target.value);
  };

  // Botón reiniciar
  const reiniciarJuego = () => {
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    setNumeroJugador('');
    setResultado('');
    setEsCorrecto(null);
    setIntentos(0);
  };

  const verificarNumero = () => {
    const numeroIngresado = parseInt(numeroJugador);
    
    if (isNaN(numeroIngresado)) return;

    // Calculamos los intentos actuales + el intento de ahora
    const intentosTotales = intentos + 1;

    if (numeroIngresado === numeroMaquina) {
      // Mostrar mensaje de éxito con los intentos finales
      setResultado(`¡Correcto! Era el ${numeroMaquina}. Te tomó ${intentosTotales} intentos.`);
      setEsCorrecto(true);
      
      // Prepara siguiente partida 
      setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
      setIntentos(0); 
      
    } else {
      // Si no es, aumenta el contador
      setIntentos(intentosTotales);
      setEsCorrecto(false);
      
      if (numeroIngresado < numeroMaquina) {
        setResultado('¡Fallaste! El número secreto es MÁS ALTO.');
      } else {
        setResultado('¡Fallaste! El número secreto es MÁS BAJO.');
      }
    }
    
    setNumeroJugador('');
  };

  return (
    <div>
      <div className="tablero">
        {/* Mostramos intentos actuales */}
        <p>Intentos: <strong>{intentos}</strong></p>
        <button type="button" onClick={reiniciarJuego} style={{marginLeft: '10px'}}>
          🔄 Reiniciar
        </button>
      </div>
      <hr />

      <form>
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder={`Ingresa un número del 1 al ${maximo}`}
          value={numeroJugador}
          onChange={manejarCambio}
        />
        
        <button type="button" onClick={verificarNumero}>
          Adivinar
        </button>
      </form>

      {resultado && (
        <div className={`resultado ${esCorrecto ? 'exito' : 'error'}`}>
          {resultado}
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