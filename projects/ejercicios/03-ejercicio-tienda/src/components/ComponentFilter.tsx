import { useEffect, useState } from "react";

export type PriceFilter = {
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
};

type ComponentFilterProps = {
  value?: PriceFilter;
  onChange?: (next: PriceFilter) => void;
  className?: string;
  debounce?: boolean;
  debounceMs?: number;
};

export default function ComponentFilter({
  value,
  onChange,
  className,
  debounce = false,
  debounceMs = 300,
}: ComponentFilterProps) {
  const [state, setState] = useState<PriceFilter>({
    minPrice: value?.minPrice,
    maxPrice: value?.maxPrice,
    searchTerm: value?.searchTerm ?? "",
  });

  useEffect(() => {
    setState({
      minPrice: value?.minPrice,
      maxPrice: value?.maxPrice,
      searchTerm: value?.searchTerm ?? "",
    });
  }, [value?.minPrice, value?.maxPrice, value?.searchTerm]);

  useEffect(() => {
    if (!onChange) return;
    if (!debounce) {
      onChange(state);
      return;
    }

    const t = setTimeout(() => onChange(state), debounceMs);
    return () => clearTimeout(t);
  }, [state, onChange, debounce, debounceMs]);

  const update = (patch: Partial<PriceFilter>) =>
    setState((s) => ({ ...s, ...patch }));

  const handleReset = () => {
    const cleared: PriceFilter = { minPrice: undefined, maxPrice: undefined, searchTerm: "" };
    setState(cleared);
    if (onChange) onChange(cleared);
  };

  const isActive =
    state.searchTerm ||
    state.minPrice !== undefined ||
    state.maxPrice !== undefined;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      
      {/* BUSCAR */}
      <input
        aria-label="Search"
        placeholder="Buscar..."
        value={state.searchTerm ?? ""}
        onChange={(e) => update({ searchTerm: e.target.value })}
        className="px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      {/* Precio MIN */}
      <input
        aria-label="Min price"
        type="number"
        placeholder="Precio Mín"
        value={state.minPrice ?? ""}
        onChange={(e) =>
          update({
            minPrice: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
        className="px-3 py-2 border rounded-lg w-30 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        min={0}
        step="0.01"
      />

      {/* Precio MAX */}
      <input
        aria-label="Max price"
        type="number"
        placeholder="Precio Máx"
        value={state.maxPrice ?? ""}
        onChange={(e) =>
          update({
            maxPrice: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
        className="px-3 py-2 border rounded-lg w-30 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        min={0}
        step="0.01"
      />

      {/* BOTÓN BORRAR FILTROS */}
      {isActive && (
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Borrar filtros
        </button>
      )}
    </div>
  );
}
