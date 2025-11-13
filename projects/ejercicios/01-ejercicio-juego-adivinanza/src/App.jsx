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

  // TODO: Crear una función para manejar el cambio del input (actualizar numeroJugador)
  // Pista: usa e.target.value y recuerda convertirlo a número.

  // TODO: Crear una función para verificar el número
  // - Si el número del jugador es igual al número aleatorio => mostrar mensaje de acierto
  // - Si no => mostrar mensaje de error
  // - Siempre generar un nuevo número aleatorio con Math.floor(Math.random() * maximo) + 1

  const [numeroJugador, setNumeroJugador] = useState();
  const [numeroMaquina, setNumeroMaquina] = useState(Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState("¡A jugar!");
  const [esCorrecto, setEsCorrecto] = useState(false);

  const handleSubmit = (e) => {
        e.preventDefault();
        if(numeroJugador == numeroMaquina){
          setResultado("Adivinaste!")
          setEsCorrecto(true)
          setNumeroMaquina(Math.floor(Math.random() * maximo) + 1)
          console.log("Adivinaste!")
        }
        else {
          setResultado("No Adivinaste!")
          setEsCorrecto(false)
          console.log("No Adivinaste!")
        }
    }

  const handleReset = () => {
    setResultado("¡A jugar!")
    setEsCorrecto(false)
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1)
    console.log("¡A jugar!")
    setContadorIntentos(0)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* TODO: Input controlado para ingresar el número */}
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder={'Ingresa un número del 1 al ${maximo}'}
          onChange={(e) => setNumeroJugador(e.target.value)}
        />
        <button type="submit">Adivinar</button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className={esCorrecto ? "resultado ganador" : "resultado"}>
        {/* Mostrar el mensaje del resultado aquí */}
        <h3>{resultado}</h3>
      </div>
      <p>El usuario seleccionó el número: {numeroJugador}</p>
      <p>La máquina seleccionó el número: {numeroMaquina}</p>
      <ButtonReset onReset={handleReset}></ButtonReset>
    </div>
  );
}

function ButtonReset({ onReset }) {
  return (
    <div>
      <button type="button" onClick = { onReset } >Reiniciar</button>
    </div>
  );
}

function App() {
  const maximo = 11;

  return (
    <div className="App">
      <Header />
      <Juego maximo={maximo} />
      <footer>¡Intenta adivinar el número entre 1 y {maximo}!</footer>
    </div>
  );
}

export default App;

