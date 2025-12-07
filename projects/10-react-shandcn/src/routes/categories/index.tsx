import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Badge } from '../../components/ui/badge';
import { Package2, Shirt, Gem, Laptop } from 'lucide-react';

export const Route = createFileRoute('/categories/')({
  component: CategoriesComponent,
});

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Laptop className="w-12 h-12" />,
  jewelery: <Gem className="w-12 h-12" />,
  "men's clothing": <Shirt className="w-12 h-12" />,
  "women's clothing": <Shirt className="w-12 h-12" />,
};

function CategoriesComponent() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });
  
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="items-center">
                <Skeleton className="w-12 h-12 rounded-full mb-2" />
                <Skeleton className="h-6 w-32" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">
          Categorías
        </h1>
        <Badge variant="secondary">
          {categories?.length} categorías
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <Link
            key={category}
            to="/categories/$category"
            params={{ category }}
          >
            <Card className="card-hover animate-fadeIn hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary transition-transform duration-200 group-hover:scale-110">
                    {categoryIcons[category] || <Package2 className="w-12 h-12" />}
                  </div>
                </div>
                <CardTitle className="capitalize">
                  {category}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
