import { useState } from 'react';
import './App.css';

function Header() {
  return (
    <header>
      <h1>🎯 Juego de Adivinanza</h1>
    </header>
  );
}

function Juego({ maximo }) {
  const [numeroJugador, setNumeroJugador] = useState('');
  const [numeroMaquina, setNumeroMaquina] = useState(Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const handleInputChange = (e) => {
    const valor = Number(e.target.value);
    // Solo permitir números entre 1 y el máximo
    if (valor >= 1 && valor <= maximo) {
      setNumeroJugador(valor);
    } else if (e.target.value === '') {
      setNumeroJugador('');
    }
  };

  const verificarNumero = () => {
    setIntentos(intentos + 1);

    if (numeroJugador === numeroMaquina) {
      setResultado(`🎉 ¡Felicitaciones! ¡Adivinaste en ${intentos + 1} intento(s)!`);
      setEsCorrecto(true);
    } else {
      const pista = numeroJugador < numeroMaquina ? '📈 El número es mayor' : '📉 El número es menor';
      setResultado(`❌ Incorrecto. ${pista}`);
      setEsCorrecto(false);
    }

    if (numeroJugador === numeroMaquina) {
      setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    }
  };

  const reiniciarJuego = () => {
    setNumeroJugador('');
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    setResultado('');
    setEsCorrecto(false);
    setIntentos(0);
  };

  return (
    <div className="juego">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          min="1"
          max={maximo}
          value={numeroJugador}
          onChange={handleInputChange}
          placeholder={`Número del 1 al ${maximo}`}
        />
        <button type="button" onClick={verificarNumero} disabled={!numeroJugador}>
          Adivinar
        </button>
        <button type="button" onClick={reiniciarJuego} className="btn-reiniciar">
          🔄 Reiniciar
        </button>
      </form>

      <div className="intentos">Intentos: {intentos}</div>

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
