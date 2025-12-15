const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-5xl">☠️</span>
      <div className="text-center text-red-500 py-8 text-2xl">
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;