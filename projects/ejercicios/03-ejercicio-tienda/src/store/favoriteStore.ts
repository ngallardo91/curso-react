import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoriteStore {
  products: Product[];
  quantity: number;
  userId: string | null;
  addToFavorites: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  setUser: (userId: string | null) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      products: [],
      quantity: 0,
      userId: null,

      setUser: (userId: string | null) => {
        set({ userId })
      },
      
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

      clearFavorites: () => {
        set({ products: [], quantity: 0 });
      },
    }),
    {
      // name: "favorites-storage-temp",
      name: (() => {
        const userId = localStorage.getItem("currentUserId")
        return userId ? `favorites-storage-${userId}` : "favorites-storage-guest"
      })(),
      partialize: (state) => ({ products: state.products })
    }
  )
);
