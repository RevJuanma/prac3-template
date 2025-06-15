import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

const PointsContext = createContext();
export function PointsProvider({ children }) {
  const [points, setPoints] = useLocalStorage("points", 100);

  const incrementPoints = (amt = 1) => setPoints((p) => p + amt);
  const decrecePoints = (amt = 1) => setPoints((p) => (p >= amt ? p - amt : p));

  return (
    <PointsContext.Provider value={{ points, incrementPoints, decrecePoints }}>
      {children}
    </PointsContext.Provider>
  );
}
export function usePoints() {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints debe usarse dentro de PointsProvider");
  return ctx;
}
