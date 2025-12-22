
// src/components/ErrorMessage.tsx
type ErrorMessageProps = {
  message?: string;             // Mensaje para el usuario
  onRetry?: () => void;         // Acción de reintento (opcional)
};

export default function ErrorMessage({
  message = "Ocurrió un error. Intenta nuevamente.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        border: "1px solid #f1b0b7",
        background: "#f8d7da",
        color: "#721c24",
        padding: "12px",
        borderRadius: "8px",
        display: "grid",
        gap: "8px",
      }}
    >
      <strong>Error</strong>
      <span>{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            justifySelf: "start",
            padding: "8px 12px",
                       borderRadius: "8px",
            border: "1px solid #999",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}