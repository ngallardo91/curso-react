// Ejemplo: src/components/LoadingSpinner.tsx
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <span className="animate-spin h-8 w-8 text-blue-500">🔄</span>
    <span className="ml-2 text-blue-500">Cargando datos...</span>
  </div>
);
export default LoadingSpinner;