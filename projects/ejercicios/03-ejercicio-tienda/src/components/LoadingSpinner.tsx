interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ message = 'Cargando...', fullPage = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );

  if (fullPage) {
    return <div className="flex justify-center items-center min-h-screen">{content}</div>;
  }

  return <div className="flex justify-center items-center min-h-[400px]">{content}</div>;
}
