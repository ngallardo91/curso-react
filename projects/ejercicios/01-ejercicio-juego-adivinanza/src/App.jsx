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

  return (
    <div>
      <form>
        {/* TODO: Input controlado para ingresar el número */}
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder={'Ingresa un número del 1 al ${maximo}'}
        />
        <button type="button">Adivinar</button>
      </form>

      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div className="resultado">
        {/* Mostrar el mensaje del resultado aquí */}
      </div>
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

