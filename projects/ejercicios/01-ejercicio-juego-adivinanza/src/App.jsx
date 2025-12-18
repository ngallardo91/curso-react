
import { useState, useEffect } from "react";
import "./App.css"; // Puede estar vacío; los estilos clave están en index.css

function Header() {
  return (
    <header>
      <h1>Juego de Adivinanza</h1>
    </header>
  );
}

function Juego({ maximo }) {
  // Estados requeridos
  const [numeroJugador, setNumeroJugador] = useState("");
  const [numeroMaquina, setNumeroMaquina] = useState(() => Math.floor(Math.random() * maximo) + 1);
  const [resultado, setResultado] = useState(`Ingresa un número del 1 al ${maximo}.`);
  const [esCorrecto, setEsCorrecto] = useState(null);

  // Asegurar número inicial si cambia 'maximo'
  useEffect(() => {
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
  }, [maximo]);

  // Manejo del input
  function handleChange(e) {
    setNumeroJugador(e.target.value);
  }

  // Verificar al hacer clic
  function handleVerificar() {
    const elegido = Number(numeroJugador);

    const esValido = Number.isInteger(elegido) && elegido >= 1 && elegido <= maximo;
    if (!esValido) {
      setResultado(`⚠️ Ingresa un número entero entre 1 y ${maximo}.`);
      setEsCorrecto(false);
      return;
    }

    const acierta = elegido === numeroMaquina;
    setEsCorrecto(acierta);

    if (acierta) {
      setResultado(`🎉 ¡Acertaste! Elegiste ${elegido} y la máquina tenía ${numeroMaquina}.`);
    } else {
      setResultado(`❌ Fallaste. Elegiste ${elegido}, la máquina tenía ${numeroMaquina}. ¡Sigue intentando!`);
    }

    // Nuevo número para el próximo intento
    setNumeroMaquina(Math.floor(Math.random() * maximo) + 1);
    // Opcional: limpiar input
    // setNumeroJugador("");
  }

  const botonDeshabilitado = numeroJugador === "";

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          min="1"
          max={maximo}
          placeholder={`Ingresa un número del 1 al ${maximo}`}
          value={numeroJugador}
          onChange={handleChange}
        />
        <button type="button" onClick={handleVerificar} disabled={botonDeshabilitado}>
          Adivinar
        </button>
      </form>

      <div
        className={`resultado ${
          esCorrecto === null ? "" : esCorrecto ? "resultado--correcto" : "resultado--incorrecto"
        }`}
        aria-live="polite"
      >
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
``

