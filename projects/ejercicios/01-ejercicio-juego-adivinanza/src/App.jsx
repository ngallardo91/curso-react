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
  const [numeroMaquina, setNumeroMaquina] = useState(() => Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);

  const handleInputChange = (e) => {
    setNumeroJugador(Number(e.target.value));
  };

  const verificarNumero = () => {
    if (numeroJugador === numeroMaquina) {
      setResultado('¡Felicidades! ¡Adivinaste el número!');
      setEsCorrecto(true);
    } else {
      setResultado(`No acertaste. El número era ${numeroMaquina}. ¡Intenta de nuevo!`);
      setEsCorrecto(false);
    }
    // Generar un nuevo número aleatorio
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    // Limpiar el input
    setNumeroJugador('');
  };

  return (
    <div>
      <form>
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder="Ingresa un número del 1 al 10"
          value={numeroJugador}
          onChange={handleInputChange}
        />
        <button type="button" onClick={verificarNumero}>Adivinar</button>
      </form>

      {resultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
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

