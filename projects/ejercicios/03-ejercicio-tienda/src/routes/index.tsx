import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 px-8 mb-12 animate-fadeIn">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-softBounce">
            🎉 ¡Nuevos productos disponibles!
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenido a{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Mi Tienda
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Descubre los mejores productos al mejor precio. Calidad garantizada y envío gratis en compras mayores a $50.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Ver Productos →
            </Link>
            <Link
              to="/categories"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Explorar Categorías
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: '1000+', label: 'Productos', icon: '📦' },
          { value: '50k+', label: 'Clientes', icon: '👥' },
          { value: '4.9', label: 'Rating', icon: '⭐' },
          { value: '24/7', label: 'Soporte', icon: '💬' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md text-center card-hover animate-fadeIn"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Features Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        ¿Por qué elegirnos?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: '🚚',
            title: 'Envío Gratis',
            description: 'En compras superiores a $50. Entrega rápida y segura.',
            color: 'from-green-400 to-emerald-500',
          },
          {
            icon: '🔒',
            title: 'Pago Seguro',
            description: 'Protección en todas tus compras con encriptación SSL.',
            color: 'from-blue-400 to-blue-600',
          },
          {
            icon: '⭐',
            title: 'Calidad Garantizada',
            description: 'Productos verificados y garantía de satisfacción.',
            color: 'from-yellow-400 to-orange-500',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md card-hover animate-fadeIn group"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para empezar?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Registrate ahora y obtené un 10% de descuento en tu primera compra.
        </p>
        <Link
          to="/register"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Crear Cuenta Gratis
        </Link>
      </div>
    </div>
  );
}
