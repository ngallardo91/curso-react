import { persist } from "zustand/middleware";
import type { Product } from "../types/product";
import { create } from "zustand";



interface FavoriteStore {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  borrarFavoritos: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

        addToFavorites: (product) => {
        set((state) => {
          const exists = state.favorites.some((item) => item.id === product.id);
          if (exists) return state; // no duplica
          return { favorites: [...state.favorites, product] };
        });
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        }));
      },

      
      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },

      borrarFavoritos: () => set({ favorites: [] }),
    }),
    {
      name: "favoritos-storege", 
    }
  )
);