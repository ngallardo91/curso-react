import { useEffect, useRef } from "react";

/**
 * 📜 Hook personalizado para Infinite Scroll usando Intersection Observer
 * 
 * @param callback - Función a ejecutar cuando el elemento trigger es visible
 * @returns triggerRef - Ref para colocar en el elemento que activa la carga
 * 
 * Uso:
 * const { triggerRef } = useInfiniteScroll(() => fetchNextPage());
 * <div ref={triggerRef}>Cargar más...</div>
 */
export function useInfiniteScroll(callback: () => void) {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Intersection Observer detecta cuando el elemento es visible en el viewport
    const observer = new IntersectionObserver((entries) => {
      // Si el elemento trigger es visible (isIntersecting), ejecutamos el callback
      if (entries[0].isIntersecting) callback();
    });

    // Observamos el elemento referenciado
    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [callback]);

  return { triggerRef };
}
