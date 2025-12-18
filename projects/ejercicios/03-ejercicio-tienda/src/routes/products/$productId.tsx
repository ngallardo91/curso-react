// src/routes/products/$productId.tsx
import { useState } from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '../../store/cartStore'; 
import { getById } from '../../services/api';
import ProductSkeleton from '../../components/ProductSkeleton';
import ErrorMessage from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = useParams({ from: '/products/$productId' });
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getById(Number(productId)),
  });

  // 1. Obtener la función addToCart del store
  const { addToCart } = useCartStore(); 
  
  // BONUS: Estado local para el feedback visual
  const [feedback, setFeedback] = useState(''); 

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Llama a la función con el producto completo
      
      // BONUS: Mostrar feedback temporal
      setFeedback('¡Agregado al Carrito!');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  if (isLoading) return <ProductSkeleton count={1} />;
  if (error) return <ErrorMessage message="Error al cargar el producto." />;
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="p-6 md:flex">
      {/* ... (resto del markup del detalle) */}
      <button 
        onClick={handleAddToCart} // <--- Implementación de la función
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 relative"
      >
        {/* Muestra el feedback o el texto del botón */}
        {feedback || "Agregar al Carrito"}
      </button>
    </div>
  );
}

// ... (resto de la exportación)