# Control de Temperatura (Vite + React + TypeScript)

Demo educativa para enseñar componentes, props, estado, eventos y hooks personalizados.
**Sin CSS externo** — todos los estilos están inline para mantener el foco en React/TS.

```bash
npm create vite@latest vite-react-temperature -- --template react-ts
cd vite-react-temperature
npm install
npm run dev
```

## Ejecutar
```bash
npm install
npm run dev
```
Luego abrir `http://localhost:5173` (o la URL que muestre Vite).

## Estructura
```
src/
├── App.tsx
├── main.tsx
├── components/
│   └── RoomCard.tsx
├── hooks/
│   └── useRooms.ts
└── types/
    └── Room.ts
```

## Qué se demuestra
- Componentes funcionales con TypeScript
- Props tipadas
- useState para manejar estado
- Eventos (`onClick`)
- Hook personalizado `useRooms`
- Estilos dinámicos inline según la temperatura

## Extensiones sugeridas para clase
- Guardar en localStorage con `useEffect`
- Añadir formulario para crear nuevas habitaciones
- Mostrar iconos/emojis según temperatura
