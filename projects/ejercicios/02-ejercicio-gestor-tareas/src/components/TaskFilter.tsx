import type { TaskFilter as TaskFilterType } from "../types/task";

interface Props {
  filter: TaskFilterType;
  setFilter: (filtro: TaskFilterType) => void;
}

export function TaskFilter({ filter, setFilter }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span>Mostrar: </span>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as TaskFilterType)}
      >
        <option value="todas">Todas</option>
        <option value="completadas">Completadas</option>
        <option value="pendientes">Pendientes</option>
      </select>
    </div>
  );
}
