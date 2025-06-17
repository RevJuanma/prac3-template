import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

// 1. Crear contexto para manejar puntos globales
const PointsContext = createContext();

export function PointsProvider({ children }) {
  // 2. Estado persistente de puntos con valor inicial 100
  const [points, setPoints] = useLocalStorage("points", 100);

  // 3. Función para incrementar puntos (por defecto +1)
  const incrementPoints = (amt = 1) => setPoints((p) => p + amt);
  // 4. Función para decrementar puntos sin pasar por debajo de cero
  const decrecePoints = (amt = 1) => setPoints((p) => (p >= amt ? p - amt : p));

  // 5. Proveer estado y funciones a la aplicación
  return (
    <PointsContext.Provider value={{ points, incrementPoints, decrecePoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  // 6. Hook personalizado para consumir PointsContext y validar su uso
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints debe usarse dentro de PointsProvider");
  return ctx;
}
