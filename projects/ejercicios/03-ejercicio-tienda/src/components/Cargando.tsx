interface CargandoProps {
  texto?: string;
  tamaño?: 'chico' | 'mediano' | 'grande';
}

export function Cargando({ texto = 'Cargando...', tamaño = 'mediano' }: CargandoProps) {
  const dimensiones = {
    chico: 'w-8 h-8',
    mediano: 'w-14 h-14',
    grande: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] gap-5">
      <div className={`${dimensiones[tamaño]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
      </div>
      <p className="text-gray-500 text-lg">{texto}</p>
    </div>
  );
}
