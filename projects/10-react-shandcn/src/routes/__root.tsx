import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ThemeToggle } from '../components/ThemeToggle';
import { ShoppingCart, Store } from 'lucide-react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20">
      <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Store className="w-6 h-6" />
                Mi Tienda
              </Link>
              <div className="flex space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link
                    to="/products"
                    activeProps={{
                      className: 'bg-accent',
                    }}
                  >
                    Productos
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link
                    to="/categories"
                    activeProps={{
                      className: 'bg-accent',
                    }}
                  >
                    Categorías
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm" className="relative gap-2">
                <Link to="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
