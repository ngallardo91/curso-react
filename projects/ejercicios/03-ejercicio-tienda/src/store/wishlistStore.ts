import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface WishlistState {
  lista: Product[];
  agregarAWishlist: (producto: Product) => void;
  quitarDeWishlist: (id: number) => void;
  estaEnWishlist: (id: number) => boolean;
  alternarWishlist: (producto: Product) => void;
  contarWishlist: () => number;
  vaciarWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      lista: [],

      agregarAWishlist: (producto) => {
        const yaExiste = get().lista.find((p) => p.id === producto.id);
        if (!yaExiste) {
          set((state) => ({ lista: [...state.lista, producto] }));
        }
      },

      quitarDeWishlist: (id) => {
        set((state) => ({
          lista: state.lista.filter((p) => p.id !== id),
        }));
      },

      estaEnWishlist: (id) => {
        return get().lista.some((p) => p.id === id);
      },

      alternarWishlist: (producto) => {
        const existe = get().estaEnWishlist(producto.id);
        if (existe) {
          get().quitarDeWishlist(producto.id);
        } else {
          get().agregarAWishlist(producto);
        }
      },

      contarWishlist: () => {
        return get().lista.length;
      },

      vaciarWishlist: () => {
        set({ lista: [] });
      },
    }),
    {
      name: 'wishlist-data',
    }
  )
);
