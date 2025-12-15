import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getTotalFavorites: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (product) => {
        set((state) => {
          const existingItem = state.favorites.find(
            (item) => item.id === product.id
          );
          
          return {
            favorites: existingItem ? state.favorites : [...state.favorites, product],
          };
        });
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        }));
      },
      
      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },

      getTotalFavorites: () => {
        return get().favorites.length;
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
