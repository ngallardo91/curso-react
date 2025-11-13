import { useEffect, useState } from 'react';
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
  const [numeroMaquina, setNumeroMaquina] = useState(undefined);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [error, setError] = useState('');
  const [intentos, setIntentos] = useState(0);
  const MAX_INTENTOS = 5;

  useEffect(() => {
    if (numeroJugador && numeroMaquina) {
      verifyNumber();
    }
  }, [numeroJugador, numeroMaquina]);

  const onInputChange = (e) => {
    setResultado('');
    setError('');
    setNumeroMaquina(undefined);

    const value = parseInt(e.target.value);
    setNumeroJugador(value);
    if (value > maximo) {
      setError('El numero ingresado no debe ser mayor a 10');
    }
  }

  const handleSubmitClick = () => {
    setIntentos(prev => prev + 1);
    const randomNumber = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(randomNumber)
  }

  const handleRebootClick = () => {
    setResultado('');
    setError('');
    setIntentos(0);
    setNumeroJugador('');
    setNumeroMaquina(undefined);
    setEsCorrecto(false);
  }

  const verifyNumber = () => {
    setEsCorrecto(numeroJugador === numeroMaquina);
    setResultado(
      numeroJugador === numeroMaquina
        ? '¡¡Ganaste!! 🎉🎉🎉'
        : 'Lo numeros no coinciden 😢'
    );
  }

  return (
    <div>
      <form>
        <div className="form-container">
          <input
            type="number"
            min="1"
            max={maximo}
            placeholder={`Ingresa un número del 1 al ${maximo}`}
            value={numeroJugador}
            onChange={onInputChange}
            style={{ flex: 1, marginRight: 10 }}
            disabled={esCorrecto || intentos >= MAX_INTENTOS}
          />
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={esCorrecto || error || !numeroJugador || intentos >= MAX_INTENTOS}
          >
            Adivinar
          </button>
        </div>
      </form>

      <div className="resultado">
        {resultado && <h2>{resultado}</h2>}
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        {numeroJugador !== undefined && numeroMaquina !== undefined &&
          <h4>{`Tu número: ${numeroJugador} - Número generado: ${numeroMaquina}`}</h4>
        }
      </div>

      <div className="intentos-container">
        <h3>{`Intentos: ${intentos}`}</h3>
        {intentos >= MAX_INTENTOS && <h4>Superaste la cantidad maxima de intentos 🏁</h4>}
        {(esCorrecto || intentos >= MAX_INTENTOS) &&
          <button
            type="button"
            onClick={handleRebootClick}
          >
            Reiniciar
          </button>
        }
      </div>
    </div>
  );
}

function App() {
  const MAX = 10;

  return (
    <div className="App">
      <Header />
      <Juego maximo={MAX} />
      <footer>{`¡Intenta adivinar el número entre 1 y ${MAX}!`}</footer>
    </div>
  );
}

export default App;

