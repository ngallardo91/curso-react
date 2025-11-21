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
  const [numeroJugador, setNumeroJugador] = useState(0)
  const [numeroMaquina, setNumeroMaquina] = useState(0)
  const [resultado, setResultado] = useState("")
  const [esCorrecto, setEsCorrecto] = useState(false)

  function onNumberChange(numero) {
    const esValido = !Number.isNaN(numero) ? true : false;

    if (esValido)
      setNumeroJugador(Number(numero))

    return esValido
  }

  function adivinar() {
    const random = Math.floor(Math.random() * maximo) + 1;
    setNumeroMaquina(random);
    
    console.log("Numero Jugador ==> ", numeroJugador)
    console.log("Numero Maquina ==> ", random)

    if (numeroJugador === random)
    {
      setResultado("Adivinaste el número que eligió la máquina")
      setEsCorrecto(true)
    }
    else
    {
      setResultado(`Seguí participando, la máquina eligió ${random}`)
      setEsCorrecto(false)
    }
  }


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          adivinar();
        }}
      >
        <input
          type="number"
          min="1"
          max={maximo}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              onNumberChange(value);
            }
          }}
          placeholder="Ingresa un número del 1 al 10"
        />
        <button 
          type="button" 
          onClick={adivinar} 
        >
          Adivinar
        </button>
      </form>

      <div className={`resultado ${esCorrecto ? "acierto" : "error"}`}>
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

