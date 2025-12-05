import { useState } from "react";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

// Importar ejemplos progresivos
import BasicFetch from "./examples/01-BasicFetch";
import BasicQuery from "./examples/02-BasicQuery";
import InfiniteQuery from "./examples/03-InfiniteQuery";
import Mutations from "./examples/04-Mutations";
import OptimisticUpdates from "./examples/05-OptimisticUpdates";
import SharedQuery from "./examples/06-SharedQuery";

/**
 * 📚 App Principal - Sistema de navegación entre ejemplos
 * 
 * Esta app está diseñada para enseñar TanStack Query progresivamente:
 * 1. Sin TanStack Query (problemas del enfoque tradicional)
 * 2. useQuery básico (solución y ventajas)
 * 3. useInfiniteQuery (paginación infinita)
 * 4. useMutation (crear, actualizar, eliminar)
 * 5. Optimistic Updates (UX instantánea)
 * 6. Ejemplo completo (todo junto)
 */

type Example = 
  | "basic-fetch" 
  | "basic-query" 
  | "infinite-query" 
  | "mutations" 
  | "optimistic"
  | "shared-query"
  | "complete";

export default function App() {
  const [currentExample, setCurrentExample] = useState<Example>("basic-fetch");

  const examples = [
    { id: "basic-fetch", label: "1️⃣ Fetch Tradicional", icon: "📝" },
    { id: "basic-query", label: "2️⃣ useQuery Básico", icon: "⚡" },
    { id: "infinite-query", label: "3️⃣ Paginación Infinita", icon: "♾️" },
    { id: "mutations", label: "4️⃣ Mutations", icon: "🔄" },
    { id: "optimistic", label: "5️⃣ Optimistic Updates", icon: "⚡" },
    { id: "shared-query", label: "6️⃣ Compartir Queries", icon: "🔗" },
    { id: "complete", label: "7️⃣ Ejemplo Completo", icon: "🎯" },
  ];

  const renderExample = () => {
    switch (currentExample) {
      case "basic-fetch":
        return <BasicFetch />;
      case "basic-query":
        return <BasicQuery />;
      case "infinite-query":
        return <InfiniteQuery />;
      case "mutations":
        return <Mutations />;
      case "optimistic":
        return <OptimisticUpdates />;
      case "shared-query":
        return <SharedQuery />;
      case "complete":
        return (
          <div style={{ padding: 20 }}>
            <h2>🎯 Ejemplo Completo: Todo junto</h2>
            <p style={{ color: "#666", marginBottom: 20 }}>
              Este ejemplo combina useInfiniteQuery + useMutation + Optimistic Updates
            </p>
            <CommentForm />
            <CommentList />
          </div>
        );
      default:
        return <BasicFetch />;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 TanStack Query - Tutorial Interactivo</h1>
        <p style={styles.subtitle}>
          Aprende TanStack Query paso a paso con ejemplos prácticos
        </p>
      </header>

      {/* Navegación por tabs */}
      <nav style={styles.nav}>
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setCurrentExample(example.id as Example)}
            style={{
              ...styles.tab,
              ...(currentExample === example.id ? styles.tabActive : {}),
            }}
          >
            <span style={styles.tabIcon}>{example.icon}</span>
            <span style={styles.tabLabel}>{example.label}</span>
          </button>
        ))}
      </nav>

      {/* Contenido del ejemplo actual */}
      <main style={styles.content}>
        {renderExample()}
      </main>

      {/* Footer con instrucciones */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.tip}>
            💡 <strong>Tip:</strong> Navega por los ejemplos en orden para entender 
            los conceptos progresivamente
          </div>
          <div style={styles.devtools}>
            🔧 Abre el <strong>React Query DevTools</strong> (esquina inferior derecha) 
            para inspeccionar queries y mutaciones en tiempo real
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "30px 20px",
    textAlign: "center" as const,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    fontSize: 32,
    fontWeight: 700 as const,
  },
  subtitle: {
    margin: "10px 0 0 0",
    fontSize: 16,
    opacity: 0.9,
  },
  nav: {
    display: "flex",
    gap: "5px",
    padding: "15px 20px",
    background: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    overflowX: "auto" as const,
    flexWrap: "wrap" as const,
  },
  tab: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "5px",
    padding: "12px 16px",
    background: "#f8f9fa",
    border: "2px solid transparent",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: 13,
    fontWeight: 500 as const,
    minWidth: 140,
  },
  tabActive: {
    background: "#667eea",
    color: "white",
    borderColor: "#667eea",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(102, 126, 234, 0.3)",
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: "center" as const,
  },
  content: {
    flex: 1,
    padding: "20px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    background: "white",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginTop: 20,
  },
  footer: {
    background: "white",
    borderTop: "1px solid #e0e0e0",
    padding: "20px",
    marginTop: 20,
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  tip: {
    background: "#fff9e6",
    border: "1px solid #ffc107",
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
  devtools: {
    background: "#e7f3ff",
    border: "1px solid #2196F3",
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
};
