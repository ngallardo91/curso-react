import { ProductSkeleton } from "./ProductSkeleton";

// ⭐️ EL COMPONENTE REUTILIZABLE PRINCIPAL ⭐️
interface LoadingSpinnerProps {
  /** Número de esqueletos a mostrar (por defecto 6). */
  count?: number;
  /** Clases CSS de Tailwind para definir la cuadrícula de la lista. */
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    count = 6, 
    // Usamos las clases de tu lista de favoritos como valor por defecto
    className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" 
}) => {
  return (
    // Aplica las clases de la cuadrícula al contenedor
    <div className={className}>
      {/* Crea un array de N elementos y mapea el esqueleto en cada uno */}
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};