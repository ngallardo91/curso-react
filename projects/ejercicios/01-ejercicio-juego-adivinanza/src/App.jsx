import { useState } from "react"; 
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

    // Estados
  const [numeroJugador, setNumeroJugador] = useState("");
  //const [numeroMaquina, setNumeroMaquina] = useState("");
  const [numeroMaquina, setNumeroMaquina] = useState(Math.floor(Math.random() * maximo) + 1);
    
  const [resultado, setResultado] = useState("");
  const [esCorrecto, setEsCorrecto] = useState(false);

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.

// Manejar cambio del input
  const manejarCambio = (e) => 
  {
    setNumeroJugador(Number(e.target.value));
  };

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1

 // Verificar número

  const verificarNumero = () => 
    {
    

     //valido que el número ingresado
     if (numeroJugador === "" || isNaN(numeroJugador)) {
      setResultado("⚠️ Ingresa un número válido");
      setEsCorrecto(false);
      return;
    }
        
    if (numeroJugador === numeroMaquina) 
      {
      //setResultado("¡Correcto! Adivinaste el número.");
      setResultado(`🎉  ¡Correcto! Adivinaste el número. Elegiste el número ${numeroJugador} y la máquina tenía el número ${numeroMaquina}.`
      );   
      setEsCorrecto(true);
    } else 
      {
      //setResultado(`Fallaste. El número era ${numeroAleatorio}.`);
      setResultado(`❌  Fallaste. Elegiste el número ${numeroJugador} y la máquina tenía el número ${numeroMaquina}.`);
      setEsCorrecto(false);
    }

     setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
  };


  return (
    <div>
        {/* TODO: Input controlado para ingresar el número */}
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



      {resultado && (
        <div className={`resultado ${esCorrecto ? "correcto" : "incorrecto"}`}>
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

