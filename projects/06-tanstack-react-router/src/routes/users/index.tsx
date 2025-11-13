import { useEffect, useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'

// Users list component.
// Loader: fetch data from /data/users.json (served from public/)
export default function UsersRoute() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch local JSON from /data/users.json (placed in /public)
    fetch('/data/users.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="muted">Cargando usuarios...</div>
  if (error) return <div className="muted">Error: {error}</div>

  return (
    <div>
      <h2>Users</h2>
      <p className="muted">Listado de usuarios (cargados desde <code>/public/data/users.json</code>).</p>

      <div className="user-list">
        {users.map(u => (
          <div className="user-item" key={u.id}>
            <div>
              <strong>{u.name}</strong>
              <div className="muted">{u.email} • {u.role}</div>
            </div>
            <div>
              {/* Link to the nested/detail route */}
              <Link to={`/users/${u.id}`}>Ver</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Outlet renderiza las rutas hijas (ej: /users/$userId) */}
      <Outlet />
    </div>
  )
}
