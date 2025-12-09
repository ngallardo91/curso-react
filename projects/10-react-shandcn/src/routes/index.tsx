import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Package, Lock, Star, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="text-center py-16 space-y-16">
      <div className="space-y-6">
        <Badge variant="secondary" className="mb-4">
          Nuevo en la tienda
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Bienvenido a Mi Tienda
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre los mejores productos al mejor precio con envío gratis y garantía de calidad
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/products">
              <Package className="w-4 h-4" />
              Ver Productos
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/categories">
              <TrendingUp className="w-4 h-4" />
              Explorar Categorías
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <Card className="card-hover animate-fadeIn hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Envío Gratis</CardTitle>
            <CardDescription>
              En compras superiores a $50. Recibe tus productos en la puerta de tu casa sin costo adicional.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="card-hover animate-fadeIn hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Pago Seguro</CardTitle>
            <CardDescription>
              Protección en todas tus compras. Procesamos pagos de forma segura y encriptada.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="card-hover animate-fadeIn hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
            <CardTitle>Calidad Garantizada</CardTitle>
            <CardDescription>
              Productos verificados y de calidad premium. Tu satisfacción es nuestra prioridad.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
