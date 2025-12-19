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
          const isAlreadyFavorite = state.favorites.some(
            (fav) => fav.id === product.id
          );
          
          if (isAlreadyFavorite) {
            return state;
          }
          
          return {
            favorites: [...state.favorites, product],
          };
        });
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== productId),
        }));
      },
      
      isFavorite: (productId) => {
        return get().favorites.some((fav) => fav.id === productId);
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

