import { createContext, useContext, useEffect, useState } from "react";

const PuntosContext = createContext();

export function PuntosProvider({ children }) {
  const [puntos, setPuntos] = useState(() => {
    const puntosGuardados = localStorage.getItem("puntos");
    return puntosGuardados ? Number(puntosGuardados) : 0;
  });

  useEffect(() => {
    localStorage.setItem("puntos", puntos);
  }, [puntos]);

  return (
    <PuntosContext.Provider value={{ puntos, setPuntos }}>
      {children}
    </PuntosContext.Provider>
  );
}

export function usePuntos() {
  return useContext(PuntosContext);
}
