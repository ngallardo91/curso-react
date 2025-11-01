// Definición de un tipo unión para el estado de temperatura
export type TemperatureStatus = 'frío' | 'ideal' | 'caliente';

export interface Room {
  id: number;
  name: string;
  temperature: number;
  status: TemperatureStatus; // Usando el tipo personalizado
}
