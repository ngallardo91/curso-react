import './App.css';
import { useState } from 'react';

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
  const [numeroMaquina, setNumeroMaquina] = useState(() => Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.
  const handleInputChange = (e) => {
    const val = e.target.value;
    setNumeroJugador(val === '' ? '' : Number(val));
  };

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1
  const verificarNumero = () => {
    if (numeroJugador === '' || numeroJugador == null) {
      setResultado('Por favor ingresa un número.');
      setEsCorrecto(false);
    } else if (numeroJugador === numeroMaquina) {
      setResultado('¡Adivinaste!');
      setEsCorrecto(true);
    } else {
      setResultado(`Fallaste. El número era ${numeroMaquina}.`);
      setEsCorrecto(false);
    }

    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
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
          onChange={handleInputChange}
        />
        <button type="button" onClick={verificarNumero}>Adivinar</button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className={`resultado ${esCorrecto ? 'correcto' : resultado ? 'incorrecto' : ''}`}>
        {resultado}
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

