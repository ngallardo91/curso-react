import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });

  const addToCart = useCartStore((state) => state.addToCart);
  
  if (isLoading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }
  
  return (
    <div>
      <a
        href="/categories"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Volver a categorías
      </a>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {category}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
            >
              Agregar
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
