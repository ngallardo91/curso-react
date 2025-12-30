interface MensajeErrorProps {
  texto?: string;
  onReintentar?: () => void;
}

export function MensajeError({
  texto = 'Ocurrió un problema',
  onReintentar
}: MensajeErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] gap-3 p-6">
      <div className="text-5xl">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-800">Algo salió mal</h3>
      <p className="text-gray-500 text-center max-w-sm">{texto}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
