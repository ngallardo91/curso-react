interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = 'Ocurrió un error', message }: ErrorMessageProps) {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mt-8 text-center border border-gray-100 dark:border-gray-800">
      <div className="text-4xl mb-2">⚠️</div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
