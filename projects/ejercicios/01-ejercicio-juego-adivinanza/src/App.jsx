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
  // TODO: Crear estados con useState para:
  // - numeroJugador (el número que ingresa el jugador)
  // - numeroMaquina (el número aleatorio generado)
  // - resultado (el mensaje de resultado)
  // - esCorrecto (booleano para indicar si adivinó o no)

  const [numeroJugador, setNumeroJugador] = useState('');
  const [numeroMaquina, setNumeroMaquina] = useState(null);
  const [resultado, setResultado] = useState('');

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.

  const handleInput = (e) => {
    console.log('entre')
    setNumeroJugador(Number(e.target.value));
  }

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1

  const verificarNumero = () => {
    const nuevoNumero = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevoNumero);
    if (numeroJugador === numeroMaquina) {
      setResultado('¡Adivino correctamente!');
    } else {
      setResultado(`Incorrecto. El número era ${nuevoNumero}`);
    }
  }



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
          onChange={handleInput}
        />
        <button type="button" onClick={verificarNumero}>
          Verificar
        </button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className="resultado">
        {resultado}
        {/* Mostrar el mensaje del resultado aquí */}
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

