import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface ProductStore {
  items: Product[];
  addProducts: (products: Product[]) => void;
  clearProducts: () => void;
  getTotalQuantity: () => number;
  getTotalPages: (pageSize: number) => number;
  getPageProducts: (quantity: number, page: number) => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProducts: (products) => {
        set({ items: products });
      },

      clearProducts: () => {
        set({ items: [] });
      },

      getTotalQuantity: () => {
        return get().items.length;
      },

      getTotalPages(pageSize) {
        const totalItems = get().items.length;
        return Math.ceil(totalItems / pageSize);
      },

      getPageProducts: (quantity, page) => {
        const items = get().items;
        const start = (page - 1) * quantity;
        const end = start + quantity;
        return items.slice(start, end);
      },
    }),
    {
      name: "product-storage",
    }
  )
);
