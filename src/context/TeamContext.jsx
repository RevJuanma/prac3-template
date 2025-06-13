import React, { createContext, useContext, useState } from "react";

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState([]);

  const toggleTeam = (id) => {
    setTeam((curr) => {
      if (curr.includes(id)) {
        // Quitar de equipo
        return curr.filter((x) => x !== id);
      } else {
        if (curr.length >= 6) {
          // Límite alcanzado
          return curr;
        }
        // Agregar a equipo
        return [...curr, id];
      }
    });
  };

  const isInTeam = (id) => team.includes(id);

  const isFilledTeams = () => {
    return team.length === 6;
  }

  return (
    <TeamContext.Provider value={{ team, toggleTeam, isInTeam, isFilledTeams }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  return context;
}