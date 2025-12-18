interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = 'Ocurrió un error inesperado',
}: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 text-lg font-semibold mb-2">
        {message}
      </p>
      <p className="text-gray-500">
        Por favor, intentá nuevamente más tarde
      </p>
    </div>
  );
}