
export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
      role="status"
      aria-label="Cargando..."
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "4px solid #ccc",
          borderTopColor: "#000",
                   borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}