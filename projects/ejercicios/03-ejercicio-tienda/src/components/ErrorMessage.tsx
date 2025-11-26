interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Ups, algo salió mal
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {message || 'No pudimos cargar la información. Por favor, intenta nuevamente.'}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}