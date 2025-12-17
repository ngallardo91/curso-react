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
   // 1) Estados
  const [numeroJugador, setNumeroJugador] = useState(''); // al principio vacío
  const [numeroMaquina, setNumeroMaquina] = useState(
    Math.floor(Math.random() * maximo) + 1
  );
  const [resultado, setResultado] = useState(''); // mensaje para mostrar
  const [esCorrecto, setEsCorrecto] = useState(false); // si acertó o no

  // 2) Manejo del cambio del input
  const handleChange = (e) => {
    // convertimos a número; si el campo queda vacío, dejamos ''
    const valor = e.target.value;
    setNumeroJugador(valor === '' ? '' : Number(valor));
  };

  // 3) Verificar el número
  const verificarNumero = () => {
    // Solo procedemos si hay un número válido
    if (numeroJugador === '' || isNaN(numeroJugador)) {
      setResultado('Por favor ingresa un número válido.');
      setEsCorrecto(false);
      return;
    }

    if (numeroJugador === numeroMaquina) {
      setResultado(`¡Correcto! El número era ${numeroMaquina}.`);
      setEsCorrecto(true);
    } else {
      setResultado(
        `Fallaste. El número era ${numeroMaquina}. ¡Intentá de nuevo!`
      );
      setEsCorrecto(false);
    }

    // Generar un nuevo número aleatorio para el siguiente intento
    const nuevoAleatorio = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(nuevoAleatorio);

    // Opcional: resetear input si querés
    setNumeroJugador('');
  };
  
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder="Ingresa un número del 1 al 10"
          value={numeroJugador}
          onChange={handleChange}
        />
        <button type="button" onClick={verificarNumero}>
          Adivinar
        </button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
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

