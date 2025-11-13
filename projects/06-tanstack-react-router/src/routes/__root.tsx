import React from 'react'
import { createRootRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import Home from './index'
import About from './about'
import UsersRoute from './users/index'
import UserDetail from './users/$userId'

// Create the root route. This builds a route tree you can pass to createRouter.
export const rootRoute = createRootRoute({
  // Root route renders the RootComponent below
  component: () => {
    // simple layout with header and an Outlet for nested routes
    return (
      <div className="container">
        <header>
          <h1>TanStack Router - Ejemplo</h1>
          <nav style={{ marginLeft: 'auto' }}>
            {/* Use Link from the router inside route components */}
            {/*<a href="/">Home</a> | <a href="/about">About</a> | <a href="/users">Users</a>*/}
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/users">Users</Link>
          </nav>
        </header>
        <main>
          {/* Outlet will render the active child route */}
          <div className="card">
            <React.Suspense fallback={<div className="muted">Cargando...</div>}>
              <Outlet />
            </React.Suspense>
          </div>
        </main>
      </div>
    )
  }
})

// Create child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About
})

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersRoute
})

const userDetailRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '$userId',
  component: UserDetail
})

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  usersRoute.addChildren([userDetailRoute])
])

export default routeTree
