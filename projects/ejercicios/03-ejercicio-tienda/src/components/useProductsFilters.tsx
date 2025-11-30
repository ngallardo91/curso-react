// useProductFilters.tsx

import { useState, useEffect, useRef } from "react"; // 👈 Importar useEffect
import type { Product } from "../types/product";

export const useProductFilters = (products: Product[] | undefined | null) => { 
    
    // 1. ESTADO LOCAL (Inicializado a 0 y valor máximo fijo)
    // Usamos valores fijos para que los Hooks se llamen siempre.
    const [maxPrice, setMaxPrice] = useState<number | string>(9999999); 
    const [minPrice, setMinPrice] = useState<number | string>(0);
    const [searchTerm, setSearchTerm] = useState('');

    const originalRangeRef = useRef({ min: '', max: '' });

    // 2. EFECTO: Actualizar min/max solo cuando los productos lleguen
    useEffect(() => {
        if (products && products.length > 0) {
            const calculatedMin = Math.min(...products.map(p => p.price));
            const calculatedMax = Math.max(...products.map(p => p.price));
            
            setMinPrice(calculatedMin); // Actualiza el estado con el valor real
            setMaxPrice(calculatedMax); // Actualiza el estado con el valor real
        }
    }, [products]); // 👈 Dependencia: Solo se ejecuta la primera vez que 'products' llega o cambia

    const resetFilters = () => {
        setMinPrice(originalRangeRef.current.min); // Precio mínimo original
        setMaxPrice(originalRangeRef.current.max); // Precio máximo original
        setSearchTerm('');                       // Término de búsqueda vacío
    };
    
    const safeProducts: Product[] = products || []; 

    const filteredProducts = safeProducts.filter((product) => {
        const maxPriceValue = 
            (maxPrice === '' || maxPrice === null || maxPrice === undefined) 
            ? 9999999
            : Number(maxPrice);
        
        const minPriceValue = 
            (minPrice === '' || minPrice === null || minPrice === undefined) 
            ? 0
            : Number(minPrice);

        const matchesPrice = product.price >= minPriceValue && product.price <= maxPriceValue;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPrice && matchesSearch;
    });
    
    return {
        filteredProducts,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        searchTerm, setSearchTerm,
        resetFilters
    };
};