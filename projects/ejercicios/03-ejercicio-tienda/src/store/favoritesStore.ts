import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  getTotalFavorites: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) => {
        set((state) => {
          const exists = state.favorites.some((p) => p.id === product.id);
          if (exists) return state;
          return { favorites: [...state.favorites, product] };
        });
      },

      removeFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        }));
      },

      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
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
