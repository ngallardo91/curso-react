// src/store/favoritesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product'; // Asegúrate de importar tu tipo Product (type-only import)

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  getTotalFavorites: () => number; // Contador
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (product) => {
        set((state) => ({ favorites: [...state.favorites, product] }));
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        }));
      },
      
      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      getTotalFavorites: () => {
        return get().favorites.length;
      }
    }),
    {
      name: 'favorites-storage', // Nombre para el localStorage
    }
  )
);