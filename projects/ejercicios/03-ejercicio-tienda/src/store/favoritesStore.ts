import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface FavoriteStore {
  items: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  clearFavorites: () => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToFavorites: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: [...state.items],
            };
          }

          return {
            items: [...state.items, product],
          };
        });
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      isFavorite: (productId) => {
        const items = get().items;
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
