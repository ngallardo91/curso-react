import { useState } from 'react';
import { Room, TemperatureStatus } from '../types/Room';

// Función auxiliar para determinar el estado de temperatura
const getTemperatureStatus = (temp: number): TemperatureStatus => {
  if (temp < 20) return 'frío';
  if (temp <= 24) return 'ideal';
  return 'caliente';
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: 'Living', temperature: 22, status: 'ideal' },
    { id: 2, name: 'Cocina', temperature: 24, status: 'ideal' },
    { id: 3, name: 'Dormitorio', temperature: 20, status: 'frío' },
  ]);

  // Añadir el estado de temperatura a cada habitación
  const updateRoomTemperature = (id: number, change: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id
          ? {
              ...room,
              temperature: room.temperature + change,
              status: getTemperatureStatus(room.temperature + change),
            }
          : room
      )
    );
  };

  const increaseTemp = (id: number) => updateRoomTemperature(id, 1);
  const decreaseTemp = (id: number) => updateRoomTemperature(id, -1);

  return { rooms, increaseTemp, decreaseTemp };
};
