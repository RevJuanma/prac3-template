import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

export const TeamContext = createContext();
export function TeamProvider({ children }) {
  const [team, setTeam] = useLocalStorage("team", []);

  const toggleTeam = (id) => {
    setTeam((curr) =>
      curr.includes(id)
        ? curr.filter((x) => x !== id)
        : curr.length < 6
        ? [...curr, id]
        : curr
    );
  };

  const isInTeam = (id) => team.includes(id);
  const isFilledTeams = () => team.length === 6;

  return (
    <TeamContext.Provider value={{ team, toggleTeam, isInTeam, isFilledTeams }}>
      {children}
    </TeamContext.Provider>
  );
}
export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam debe usarse dentro de TeamProvider");
  return ctx;
}
