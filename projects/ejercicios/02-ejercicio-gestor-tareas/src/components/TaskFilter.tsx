import type { TaskFilter as FilterType } from "../types/task";

interface Props {
  filter: FilterType;
  setFilter: (filtro: FilterType) => void;
}

export function TaskFilter({ filter, setFilter }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span>Mostrar: </span>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterType)}
      >
        <option value="todas">Todas</option>
        <option value="completadas">Completadas</option>
        <option value="pendientes">Pendientes</option>
      </select>
    </div>
  );
}
