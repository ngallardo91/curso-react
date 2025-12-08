import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated) {
      throw redirect({ to: "/register" })
    }
  },
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Bienvenido a Mi Tienda
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Descubre los mejores productos al mejor precio
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          search={{ page: 1 }}
          className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Ver Productos
        </Link>
        <Link
          to="/categories"
          className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Explorar Categorías
        </Link>
        <Link
          to="/favorites"
          className="bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Favoritos
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fadeIn">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
          <p className="text-gray-600">
            En compras superiores a $50
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Pago Seguro</h3>
          <p className="text-gray-600">
            Protección en todas tus compras
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
          <p className="text-gray-600">
            Productos verificados y de calidad
          </p>
        </div>
      </div>
    </div>
  );
}
