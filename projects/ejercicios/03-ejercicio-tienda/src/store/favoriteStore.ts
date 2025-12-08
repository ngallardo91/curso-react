import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';
import { useAuthStore } from './authStore';

interface FavoriteStore {
  products: Product[];
  quantity: number;
  addToFavorites: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

function getFavoritesStorageKey() {
  const user = useAuthStore.getState().user;
  return user ? `favorites-storage-${user.id}` : `favorites-storage-guest`;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      products: [],
      quantity: 0,
      
      addToFavorites: (product) => {
        set((state) => {
          const existingProduct = state.products.some(
            (item) => item.id === product.id
          );
          
          if (existingProduct) {
            return state;
          }
          
          return {
            products: [...state.products, product ],
            quantity: state.quantity + 1,
          };
        });
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          products: state.products.filter((item) => item.id !== productId),
          quantity: state.quantity - 1
        }))
      },

      isFavorite: (productId) => {
        return get().products.some((item) => item.id === productId)
      },
    }),
    {
      name: getFavoritesStorageKey(),
    }
  )
);
