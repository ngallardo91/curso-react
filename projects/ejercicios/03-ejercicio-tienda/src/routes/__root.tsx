import { createRootRoute, Outlet, Link, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { Heart, LogIn, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useTokenRefresh } from '../hooks/useTokenRefresh';
import { Dialogo } from '../components/Dialogo';
import { mockAuthService } from '../services/mockAuthService';
import { useAuthStore } from '../store/authStore';
import { UserMenu } from '../components/UserMenu';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useTokenRefresh();
  
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoriteStore((state) => state.quantity);
  const [openDialogoLogin, setOpenDialogoLogin] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginFlow, setLoginFlow] = useState<"email" | "password">("email")
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate();

  function openLoginDialog() {
    setLoginFlow("email");
    setEmail("");
    setPassword("");
    setError("");
    setOpenDialogoLogin(true);
  }

  async function handleSubmitEmail() {
    if (!email) return

    setError("");

    const exists = await mockAuthService.checkEmail(email);

    console.log("exists ==> ", exists)
    console.log("email ==> ", email)
    if (exists) {
      setLoginFlow("password");
      return
    } 

    navigate({ to: "/login", search: { email }});
    setOpenDialogoLogin(false);
  }

  async function handleSubmitPassword() {
    setError("");

    try {
      const result = await login(email, password)
      
      if (result) {
        setOpenDialogoLogin(false)
        navigate({ to: '/' })
      } else {
        setError("Contraseña Incorrecta")
      }
    } catch (e) {
      setError(`Error al iniciar sesión ==> ${e}`)
    }
  }

  function maskEmail (email: string) {
    const [name, domain] = email.split("@");
    return name[0] + "*".repeat(name.length - 1) + "@" + domain;
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600"
              >
                Mi Tienda
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  search={{
                    page: 1,
                  }}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Productos
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Categorías
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
              <Link
                to="/favorites"
                className="relative text-gray-700 hover:text-red-500 transition-all duration-100 hover:scale-110"
              >
                <Heart className="w-6 h-6"/>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalFavorites}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-100 hover:scale-110"
              >
                <ShoppingCart className="w-6 h-6"/>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="relative">
                {isAuthenticated && user ? (
                  <UserMenu user={user} onLogout={logout}/>
                ) : (
                  <button
                    onClick={openLoginDialog}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-all duration-200 hover:scale-110"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <LogIn className="w-6 h-6"/> Ingresa
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Dialogo open={openDialogoLogin} onClose={() => setOpenDialogoLogin(false)}>
        <h2 className="text-xl font-bold mb-2 text-center"> 
          { loginFlow === "email" ? "Iniciar Sesión" : "Ingresá tu contraseña" }
        </h2>
        
        {loginFlow === "email" && (
          <>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Ingresá tu email para continuar
            </p>

            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com.ar"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            </input>

            <button
              onClick={handleSubmitEmail}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continuar
            </button>
          </>
        )}

        {loginFlow === "password" && (
          <>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Ingresá tu contraseña para <br />
              <span className="font-semibold">
                {maskEmail(email)}
              </span>
            </p>

            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            </input>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center"> {error} </p>
            )}

            <button
              onClick={handleSubmitPassword}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Ingresar
            </button>
          </>
        )}
      </Dialogo>
      
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
