// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ErrorMessage from '../components/ErrorMessage'; 

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAll,
  });

  if (isLoading) return <ProductSkeleton count={8} />;
  if (error) return <ErrorMessage message="Error al cargar la lista de productos. Intenta de nuevo." />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Bienvenido a la Tienda</h2>
      <p className="text-gray-600 mb-6">Explora nuestros productos destacados</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}