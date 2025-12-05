import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoriteStore {
  products: Product[];
  addToFavorites: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      products: [],
      
      addToFavorites: (product) => {
        set((state) => {
          const existingProduct = state.products.find(
            (item) => item.id === product.id
          );
          
          if (existingProduct) {
            return state;
          }
          
          return {
            products: [...state.products, product ],
          };
        });
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          products: state.products.filter((item) => item.id !== productId),
        }));
      },

      isFavorite: (productId) => {
        return get().products.some((item) => item.id === productId)
      }
    }),
    {
      name: 'favorite-storage',
    }
  )
);
