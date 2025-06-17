import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
export const MAX_TEAM_SIZE = 6; // 1. Definir límite máximo de miembros en el equipo

// 2. Crear contexto para compartir estado de equipo
export const TeamContext = createContext();

export function TeamProvider({ children }) {
  // 3. Inicializar estado persistente: lista de IDs en el equipo
  const [team, setTeam] = useLocalStorage("team", []);

  // 4. Función para alternar presencia: agrega o remueve según estado y límite
  const toggleTeam = (id) => {
    setTeam(
      (curr) =>
        curr.includes(id)
          ? curr.filter((x) => x !== id) // 4.1 Si ya está, remover del equipo
          : curr.length < MAX_TEAM_SIZE // 4.2 Si no está y hay espacio, agregar
          ? [...curr, id]
          : curr // 4.3 Si está lleno, no cambiar
    );
  };

  // 5. Verificar si un ID está actualmente en el equipo
  const isInTeam = (id) => team.includes(id);
  // 6. Indicar si el equipo alcanzó su capacidad máxima
  const isFilledTeams = () => team.length === MAX_TEAM_SIZE;

  // 7. Proveer estado y funciones a los componentes hijos
  return (
    <TeamContext.Provider value={{ team, toggleTeam, isInTeam, isFilledTeams }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  // 8. Hook personalizado para consumir contexto y validar proveedor
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam debe usarse dentro de TeamProvider");
  return ctx;
}
