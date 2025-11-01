import React from "react";
import { Room, TemperatureStatus } from "../types/Room";

// Mapeo de estados de temperatura a emojis
const statusEmojis: Record<TemperatureStatus, string> = {
  'frío': '❄️',
  'ideal': '😊',
  'caliente': '🔥'
};

// Mapeo de estados a colores
const statusColors: Record<TemperatureStatus, string> = {
  'frío': '#b3d9ff',
  'ideal': '#c6f6c6',
  'caliente': '#ffb3b3'
};

interface RoomCardProps {
  room: Room;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export const RoomCard = ({ room, onIncrease, onDecrease }: RoomCardProps) => {
  // Función auxiliar para determinar el estado basado en la temperatura
  const getTemperatureStatus = (temp: number): TemperatureStatus => {
    if (temp < 20) return 'frío';
    if (temp <= 24) return 'ideal';
    return 'caliente';
  };

  const status = getTemperatureStatus(room.temperature);
  const backgroundColor = statusColors[status];

  const cardStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius: "10px",
    padding: "1rem",
    margin: "0.5rem auto",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    transition: "transform 0.15s ease",
  };

  const tempStyle: React.CSSProperties = {
    fontSize: "1.2rem",
    fontWeight: 600,
  };

  return (
    <div style={cardStyle}>
      <h3>{room.name}</h3>
      <div style={tempStyle}>
        {room.temperature}°C
        <span style={{ marginLeft: '8px' }}>
          {statusEmojis[status]} {status}
        </span>
      </div>
      <div>
        <button onClick={() => onDecrease(room.id)} aria-label={`Disminuir ${room.name}`}>
          -
        </button>
        <button
          onClick={() => onIncrease(room.id)}
          aria-label={`Aumentar ${room.name}`}
          style={{ marginLeft: "0.5rem" }}
        >
          +
        </button>
      </div>
    </div>
  );
};
