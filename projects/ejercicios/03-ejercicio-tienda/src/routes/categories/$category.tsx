// src/routes/categories/$category.tsx
import { createFileRoute, useRouteContext } from '@tanstack/react-router'; // Modificado
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '../../store/cartStore';
import ProductCard from '../../components/ProductCard';
import ProductSkeleton from '../../components/ProductSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import { getByCategory } from '../../services/api';

// @ts-ignore - Route will be generated after route tree regeneration
export const Route = createFileRoute('/categories/$category')({
  // No necesitamos definir un loader aquí, solo el componente
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  // 1. FORMA CORRECTA: Usar el hook de la ruta generada para obtener los params
  // Esto asume que el árbol de rutas está generado y tipado correctamente.
  // El tipo inferido será { category: string }
  const { category } = Route.useParams(); 
    
  // const { category } = useRouteContext({ select: (ctx) => ctx.params }); // Una alternativa, pero Route.useParams() es más directo
  
  const { addToCart } = useCartStore();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getByCategory(category),
  });

  if (isLoading) return <ProductSkeleton count={4} />;
  if (error) return <ErrorMessage message="Error al cargar los productos por categoría." />;
//prueba
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 capitalize">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />

            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-green-500 text-white py-1.5 rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              🛒 Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}