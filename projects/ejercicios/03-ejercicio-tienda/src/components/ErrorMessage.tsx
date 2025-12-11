import React from 'react';
import { AlertCircle } from 'lucide-react'; // Icono de alerta para el toque visual

interface ErrorMessageProps {
  /** El mensaje de error específico a mostrar. */
  message: string;
  /** Clases CSS opcionales para personalizar el contenedor. */
  className?: string;
}

/**
 * Componente reutilizable para mostrar mensajes de error con formato de alerta.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) {
    return null; // No renderizar si no hay mensaje de error
  }

  return (
    <div 
      role="alert" // Mejora la accesibilidad, indicando que es un mensaje importante
      className={`p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-3 ${className}`}
    >
      <AlertCircle className="size-5 flex-shrink-0" />
      <p className="text-sm font-medium">
        {message}
      </p>
    </div>
  );
};