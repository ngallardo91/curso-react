import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) => {
        const exists = get().favorites.some(
          (item) => item.id === product.id
        );
        if (!exists) {
          set({ favorites: [...get().favorites, product] });
        }
      },

      removeFavorite: (productId) => {
        set({
          favorites: get().favorites.filter(
            (item) => item.id !== productId
          ),
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some(
          (item) => item.id === productId
        );
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);