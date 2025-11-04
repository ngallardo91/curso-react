import './App.css'
import { ProductCounter } from './components/ProductCounter'
import { ProductList } from './components/ProductList'
import { ProductEditor } from './components/ProductEditor'
import { useEffect } from 'react'
import { getAllUsers } from './services/users'

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers()
      console.log('Usuarios cargados:', users)
    };
    fetchData();
  }, [])

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ejemplo Zustand + Fetch + Persistencia</h1>
      
      <hr style={{ margin: "20px 0" }} />

      {/* Componente para editar productos */}
      <ProductEditor />
      
      <hr style={{ margin: "20px 0" }} />
      
      <ProductList />
      <ProductCounter />
    </div>
  )
}

export default App
