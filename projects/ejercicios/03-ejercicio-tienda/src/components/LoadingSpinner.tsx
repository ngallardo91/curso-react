const LoadingSpinner = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="loader ease-linear rounded-full border-8 border-gray-200 border-t-8 border-t-blue-500 h-16 w-16 animate-spin" />
      <div className="text-center text-gray-900 py-8 text-2xl">
        {message}
      </div>
    </div>

  );
}

export default LoadingSpinner;
