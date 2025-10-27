import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState<string>('React + Vite + TypeScript')

  return (
    <div className="app">
      <h1>¡Hola desde {name}!</h1>
      <input
        type="text"
        placeholder="Cambia el texto"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

export default App