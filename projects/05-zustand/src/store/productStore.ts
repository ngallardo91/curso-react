import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getAllProducts } from "../services/products";

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductStore = {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  clearProducts: () => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
};

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchProducts: async () => {
          set({ loading: true });
          const data = await getAllProducts();
          set({ products: data, loading: false });
        },
        clearProducts: () => set({ products: [] }),
        updateProduct: (id: number, updates: Partial<Product>) => {

          const product = get().products.find((p) => p.id === id);
          if (!product) return;

          const updatedProduct = { ...product, ...updates };

          const updatedProducts = get().products.map((p) =>
            p.id === id ? updatedProduct : p
          );

          set({ products: updatedProducts });

          /**
          set((state) => ({
            products: state.products.map((product) =>
              product.id === id ? { ...product, ...updates } : product
            ),
          }));
          */
        },
      }),
      {
        name: "product-storage", // nombre en localStorage
      }
    )
  )
);
