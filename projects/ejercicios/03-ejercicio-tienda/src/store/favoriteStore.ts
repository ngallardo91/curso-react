import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoriteStore {
  items: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  contadorFavoritos: () => number;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToFavorites: (product) => {
            set((state) => {
               const existingItem = state.items.find(
                  (item) => item.id === product.id
               );
               
               // Evita añadir duplicados: si ya existe, devuelve el estado actual.
               if (existingItem) {
                  return state; 
               }
               
               // CORRECCIÓN: Almacenar 'product' directamente en el array, no '{ product }'
               return {
                  items: [...state.items, product], // <-- ¡CORREGIDO!
               };
            });
         },
      
      removeFromFavorites: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      
      isFavorite: (productId) => {
                // 1. Usar get() para obtener el estado actual (incluyendo el array 'items')
                const { items } = get(); 
                
                // 2. Usar Array.prototype.some() para buscar en el array
                return items.some((item) => item.id === productId);
            },

      contadorFavoritos: () => {
        const { items } = get(); // Obtiene el estado actual
        return items.length;      // Devuelve la longitud del array de productos
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
