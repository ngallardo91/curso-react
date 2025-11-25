import { useEffect, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'

export default function UserDetail() {
  // useParams provided by the router to access route params
  const { userId } = useParams({ strict: false })
  const id = userId
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/data/users.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((list) => {
        const found = list.find((x: any) => String(x.id) === String(id))
        setUser(found ?? null)
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="muted">Cargando usuario...</div>
  if (error) return <div className="muted">Error: {error}</div>
  if (!user) return <div className="muted">Usuario no encontrado</div>

  return (
    <div>
      <h2>Detalle de: {user.name}</h2>
      <div className="muted">Email: {user.email}</div>
      <div className="muted">Role: {user.role}</div>

      <p style={{ marginTop: 12 }}>
        <Link to="/users">Volver a la lista</Link>
      </p>
    </div>
  )
}
