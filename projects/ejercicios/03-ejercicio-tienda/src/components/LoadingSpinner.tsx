export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <img
        src="/coyote.gif"
        alt="Cargando..."
        className="h-55 w-55 object-contain"
      />
    </div>
  );
}