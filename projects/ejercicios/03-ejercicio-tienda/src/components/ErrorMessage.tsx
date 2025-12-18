// Ejemplo: src/components/ErrorMessage.tsx
interface ErrorMessageProps { message: string; }
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center p-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
    <span className="h-6 w-6 mr-3">⚠️</span>
    <p className="font-medium">{message}</p>
  </div>
);
export default ErrorMessage;