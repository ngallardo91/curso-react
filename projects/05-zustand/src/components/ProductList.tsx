import { useProductStore } from "../store/productStore";

export const ProductList = () => {
  //const { products, fetchProducts, clearProducts, loading } =
  //  useProductStore();

  const products = useProductStore(state => state.products)
  const loading = useProductStore(state => state.loading)
  const fetchProducts = useProductStore(state => state.fetchProducts)
  const clearProducts = useProductStore(state => state.clearProducts)

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Lista de Productos</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={fetchProducts} disabled={loading}>
          {loading ? "Cargando..." : "Cargar Productos"}
        </button>
        <button onClick={clearProducts} style={{ marginLeft: "1rem" }}>
          Limpiar
        </button>
      </div>

      {products.length === 0 ? (
        <p>No hay productos cargados.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
