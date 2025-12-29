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
  // Estados con useState
  const [numeroJugador, setNumeroJugador] = useState('');
  const [numeroMaquina, setNumeroMaquina] = useState(() => 
    Math.floor(Math.random() * maximo) + 1
  );
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(null);
  const [intentos, setIntentos] = useState(0);

  // Función para manejar el cambio del input
  const handleInputChange = (e) => {
    const valor = Number(e.target.value);
    if (valor >= 1 && valor <= maximo) {
      setNumeroJugador(valor);
    } else if (e.target.value === '') {
      setNumeroJugador('');
    }
  };

  // Función para verificar el número
  const handleVerificar = () => {
    if (!numeroJugador) {
      setResultado('Por favor ingresa un número');
      setEsCorrecto(null);
      return;
    }

    setIntentos(intentos + 1);

    if (numeroJugador === numeroMaquina) {
      setResultado(`¡Felicitaciones! Adivinaste el número ${numeroMaquina} 🎉`);
      setEsCorrecto(true);
    } else {
      setResultado(`❌ No adivinaste. El número era ${numeroMaquina}. ¡Intenta de nuevo!`);
      setEsCorrecto(false);
    }

    // Generar un nuevo número aleatorio
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    setNumeroJugador('');
  };

  // Función para reiniciar el juego
  const handleReiniciar = () => {
    setNumeroJugador('');
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    setResultado('');
    setEsCorrecto(null);
    setIntentos(0);
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleVerificar(); }}>
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder={`Ingresa un número del 1 al ${maximo}`}
          value={numeroJugador}
          onChange={handleInputChange}
        />
        <button type="submit">Adivinar</button>
      </form>

      {/* Mostrar el resultado con una clase dinámica si adivinó */}
      {resultado && (
        <div className={`resultado ${esCorrecto === true ? 'correcto' : esCorrecto === false ? 'incorrecto' : ''}`}>
          {resultado}
        </div>
      )}

      {/* Contador de intentos */}
      {intentos > 0 && (
        <div className="intentos">
          Intentos: {intentos}
        </div>
      )}

      {/* Botón para reiniciar */}
      {intentos > 0 && (
        <button type="button" onClick={handleReiniciar} className="reiniciar">
          Reiniciar Juego
        </button>
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

