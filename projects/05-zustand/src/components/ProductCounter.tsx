import { useProductStore } from "../store/productStore";

export const ProductCounter = () => {
  const count = useProductStore((state) => state.products.length);

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "8px" }}>
      <h3>Cantidad de productos cargados: {count}</h3>
    </div>
  );
};
