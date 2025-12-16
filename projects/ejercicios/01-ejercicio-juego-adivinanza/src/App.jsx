
import React, { useState } from 'react';



// --- Función auxiliar para generar un número aleatorio ---
const generarNumeroAleatorio = (max) => {
  // Genera un número entero entre 1 y 'max' (inclusive)
  return Math.floor(Math.random() * max) + 1;
};

// --- Componente principal del juego ---
function Juego({ maximo }) {
  // Inicializamos el número de la máquina con un valor aleatorio inicial.
  const [numeroMaquina, setNumeroMaquina] = useState(() => generarNumeroAleatorio(maximo));
  
  // TODO: Crear estados con useState
  const [numeroJugador, setNumeroJugador] = useState(1);
  const [resultado, setResultado] = useState('¡Ingresa tu primer número!');
  const [esCorrecto, setEsCorrecto] = useState(false);

  // TODO: Crear una función para manejar el cambio del input
  const handleInputChange = (e) => {
    // Convertir el valor a número. Si es NaN o fuera de rango, forzar el límite.
    let valor = parseInt(e.target.value);
    
    if (isNaN(valor) || valor < 1) {
      valor = 1;
    } else if (valor > maximo) {
      valor = maximo;
    }
    
    setNumeroJugador(valor);
  };

  // TODO: Crear una función para verificar el número
  const verificarNumero = () => {
    // 1. Generar un nuevo número aleatorio para esta ronda
    const nuevoNumeroMaquina = generarNumeroAleatorio(maximo);
    setNumeroMaquina(nuevoNumeroMaquina);

    // 2. Comparar el número del jugador con el nuevo número de la máquina
    if (numeroJugador === nuevoNumeroMaquina) {
      // Si coinciden
      setResultado(`¡Felicidades Crack! Adivinaste : ${nuevoNumeroMaquina}.`);
      setEsCorrecto(true);
    } else {
      // Si no coinciden
      setResultado(`Incorrecto. El número era ${nuevoNumeroMaquina}. ¡Sigue intentando!`);
      setEsCorrecto(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Adivina el Número (1 - {maximo})</h3>
      <form onSubmit={(e) => e.preventDefault()}> {/* Evita el refresh del formulario */}
        
        {/* TODO: Input controlado para ingresar el número */}
        <input
          type="number"
          min="1"
          max={maximo}
          value={numeroJugador}
          onChange={handleInputChange} // Asocia la función de cambio
          placeholder={`Ingresa un número del 1 al ${maximo}`}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        
        <button 
          type="button" 
          onClick={verificarNumero} // Asocia la función de verificación
          style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Adivinar
        </button>
      </form>
      
      <hr />
      
      {/* TODO: Mostrar el resultado con una clase dinámica si adivinó */}
      <div 
        className="resultado" 
        style={{ 
          marginTop: '15px', 
          padding: '10px', 
          // Clase dinámica basada en esCorrecto para estilizado visual
          backgroundColor: esCorrecto ? '#d4edda' : '#f8d7da', 
          color: esCorrecto ? '#155724' : '#721c24',
          border: `1px solid ${esCorrecto ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}
      >
        <p>{resultado}</p>
        <small>Tu número elegido: **{numeroJugador}**</small>
      </div>
      <p style={{ marginTop: '10px', fontSize: '0.8em', color: '#666' }}>
        * El número de la máquina se genera en cada intento.
      </p>
    </div>
  );
}

// Componente de ejemplo para el encabezado (Header)
const Header = () => (
    <h1 style={{ textAlign: 'center', color: '#333' }}>Juego de Adivinanza React</h1>
);

// --- Componente principal de la aplicación ---
function App() {
  return (
    <div className="App">
      <Header />
      <Juego maximo={10} />
      <footer style={{ textAlign: 'center', marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
        ¡Intenta adivinar el número entre 1 y 10!
      </footer>
    </div>
  );
}

export default App;