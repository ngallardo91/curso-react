interface Props {
  filter: "todas" | "completadas" | "pendientes";
  setFilter: (filtro: "todas" | "completadas" | "pendientes") => void;
}

export function TaskFilter({ filter, setFilter }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span>Mostrar: </span>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as "todas" | "completadas" | "pendientes")}
      >
        <option value="todas">Todas</option>
        <option value="completadas">Completadas</option>
        <option value="pendientes">Pendientes</option>
      </select>
    </div>
  );
}
