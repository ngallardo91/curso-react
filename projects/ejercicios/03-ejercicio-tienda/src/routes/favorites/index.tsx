import { createFileRoute } from '@tanstack/react-router';
import { useFavoriteStore } from '../../store/favoriteStore';
import { ProductCard } from '../../components/ProductCard';
import { Heart } from 'lucide-react';

export const Route = createFileRoute('/favorites/')({
  component: CartComponent,
});

function CartComponent() {
  const items = useFavoriteStore((state) => state.products);
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="flex w-20 h-20 mb-4 text-red-600 mx-auto"/>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No tenes productos favoritos
        </h2>
        <p className="text-gray-600 mb-6">
          ¡Si encontrás un producto de tu agrado, agregalo como favorito!
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-block"
        >
          Ir a Productos
        </a>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Favoritos
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div className="space-y-4">
                <ProductCard product={item} alert={{description: "Producto Agregado desde Favoritos", color: "red" }} />
            </div>
          ))}
      </div>
    </div>
  );
}
