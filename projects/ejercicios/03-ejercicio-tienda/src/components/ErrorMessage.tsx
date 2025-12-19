interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'Error al cargar los datos' }: ErrorMessageProps) {
  return (
    <div className="text-center text-red-600 py-8">
      {message}
    </div>
  );
}

