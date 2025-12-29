import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_URL,
});

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    /* Simular retraso para poder ver el gif */
    await new Promise(resolve => setTimeout(resolve, 5000)) 
    const { data } = await api.get<Product[]>('/products');
    return data;
  },
  
  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
  
  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get<string[]>('/products/categories');
    return data;
  },
  
  getByCategory: async (category: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(`/products/category/${category}`);
    return data;
  },
};
