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
  const [numeroMaquina, setNumeroMaquina] = useState(Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const manejarCambio = (event) => {
    setNumeroJugador(event.target.value);
  };

  const verificarNumero = () => {
    const valor = Number(numeroJugador);

    if (!valor || valor < 1 || valor > maximo) {
      setResultado('Ingresa un numero entre 1 y ' + maximo);
      setEsCorrecto(false);
      return;
    }

    const nuevoNumero = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevoNumero);
    setIntentos(intentos + 1);

    if (valor === nuevoNumero) {
      setResultado('Ganaste, el numero era ' + nuevoNumero);
      setEsCorrecto(true);
    } else {
      setResultado('No es correcto, el numero era ' + nuevoNumero);
      setEsCorrecto(false);
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
    <main className="juego">
      <div className="juego-contenido">
        <p>Ingresa un numero del 1 al {maximo}</p>

        <input
          type="number"
          min="1"
          max={maximo}
          value={numeroJugador}
          onChange={manejarCambio}
        />

        <button onClick={verificarNumero}>Probar</button>

        {resultado && (
          <p className={esCorrecto ? 'mensaje correcto' : 'mensaje incorrecto'}>
            {resultado}
          </p>
        )}

        <p>Intentos: {intentos}</p>

        <button onClick={reiniciarJuego}>Reiniciar</button>
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Juego maximo={10} />
      <footer>Intenta adivinar el numero entre 1 y 10</footer>
    </div>
  );
}

export default App;


