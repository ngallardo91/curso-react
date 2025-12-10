import type{ TaskFilter } from "../types/task"

type Props = {
  value: TaskFilter
  onChange: (v: TaskFilter) => void
}

function TaskFilterSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={e => onChange(e.target.value as TaskFilter)}>
      <option value="todas">todas</option>
      <option value="completadas">completadas</option>
      <option value="pendientes">pendientes</option>
    </select>
  )
}

export default TaskFilterSelect
