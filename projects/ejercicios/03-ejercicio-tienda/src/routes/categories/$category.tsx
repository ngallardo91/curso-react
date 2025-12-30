import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { ProductCard } from '../../components/ProductCard';


export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });
  
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
    </div>
  );
}
