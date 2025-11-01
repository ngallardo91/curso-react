import React from "react";
import { useRooms } from "./hooks/useRooms";
import { RoomCard } from "./components/RoomCard";

export default function App() {
  const { rooms, increaseTemp, decreaseTemp } = useRooms();

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1>Control de Temperatura</h1>
      <p>Haz clic en + o - para ajustar la temperatura de cada habitación</p>
      <div>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onIncrease={increaseTemp}
            onDecrease={decreaseTemp}
          />
        ))}
      </div>
    </div>
  );
}
