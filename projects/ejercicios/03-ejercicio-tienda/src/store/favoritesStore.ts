
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  
  toggleFavorite: (product: Product) => void;
  
  clearFavorites?: () => void;
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

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },

      
      toggleFavorite: (product) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
      },

      
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
      
      partialize: (state) => ({ favorites: state.favorites }),
      version: 1,
    }
  )
);


