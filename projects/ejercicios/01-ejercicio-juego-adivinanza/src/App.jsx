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
  // Estados del juego
  const [valorIngresado, setValorIngresado] = useState('');
  const [numeroSecreto, setNumeroSecreto] = useState(() => 
    Math.floor(Math.random() * maximo) + 1
  );
  const [mensaje, setMensaje] = useState('');
  const [gano, setGano] = useState(false);
  const [intentos, setIntentos] = useState(0);

  // Manejar cambio en el input
  const actualizarValor = (evento) => {
    const valor = evento.target.value;
    setValorIngresado(valor);
  };

  // Verificar si adivinó
  const comprobar = () => {
    const numeroUsuario = Number(valorIngresado);
    setIntentos(prev => prev + 1);
    
    if (numeroUsuario === numeroSecreto) {
      setMensaje(`🎉 ¡Excelente! Adivinaste en ${intentos + 1} intento${intentos > 0 ? 's' : ''}!`);
      setGano(true);
    } else {
      const pista = numeroUsuario > numeroSecreto ? 'más bajo' : 'más alto';
      setMensaje(`❌ Incorrecto. El número es ${pista}. ¡Sigue intentando!`);
      setNumeroSecreto(Math.floor(Math.random() * maximo) + 1);
    }
  };

  // Reiniciar juego
  const reiniciar = () => {
    setValorIngresado('');
    setNumeroSecreto(Math.floor(Math.random() * maximo) + 1);
    setMensaje('');
    setGano(false);
    setIntentos(0);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          min="1"
          max={maximo}
          value={valorIngresado}
          onChange={actualizarValor}
          placeholder={`Elige un número del 1 al ${maximo}`}
          disabled={gano}
        />
        {!gano ? (
          <button type="button" onClick={comprobar} disabled={!valorIngresado}>
            Adivinar
          </button>
        ) : (
          <button type="button" onClick={reiniciar}>
            Jugar de nuevo
          </button>
        )}
      </form>

      <div className={`resultado ${gano ? 'correcto' : ''}`}>
        {mensaje}
      </div>

      {intentos > 0 && (
        <p style={{ marginTop: '10px', color: '#666' }}>
          Intentos realizados: {intentos}
        </p>
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
