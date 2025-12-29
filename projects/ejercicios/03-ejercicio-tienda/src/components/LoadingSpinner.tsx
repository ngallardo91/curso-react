export default function LoadSpinner() {
    return (
      <div className="flex justify-center items-center py-10">
        <img
          src="/load.gif"
          alt="Loading..."
          className="h-55 w-55 object-contain"
        />
      </div>
    );
  }