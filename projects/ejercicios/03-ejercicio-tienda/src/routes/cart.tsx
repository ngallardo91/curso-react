import { createFileRoute } from '@tanstack/react-router';
import { useCartStore } from '../store/cartStore';
import { CartItemComponent } from '../components/CartItem';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/cart')({
  component: CartComponent,
});

function CartComponent() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado.');
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-6">
          ¡Agrega productos para empezar a comprar!
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
          Carrito de Compras
        </h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 font-semibold"
        >
          Vaciar Carrito
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemComponent key={item.product.id} item={item} />
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md h-fit animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío:</span>
              <span className="font-semibold">
                {totalPrice > 50 ? 'GRATIS' : '$5.99'}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                ${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
          </div>
          <a
            href="/checkout"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
          >
            Proceder al Pago
          </a>
        </div>
      </div>
    </div>
  );
}
