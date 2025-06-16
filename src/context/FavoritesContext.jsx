import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
export const MAX_FAVS_SIZE = 10;

export const FavoritesContext = createContext();
export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useLocalStorage("favorites", []);
  const [customNames, setCustomNames] = useLocalStorage("customNames", {});

  const isFavorite = (id) => favs.includes(id);
  const toggleFavorite = (id) => {
    setFavs((curr) =>
      curr.includes(id)
        ? curr.filter((x) => x !== id)
        : curr.length < MAX_FAVS_SIZE
        ? [...curr, id]
        : curr
    );
  };
  const setCustomName = (id, name) =>
    setCustomNames((curr) => ({ ...curr, [id]: name }));
  const isFilledFavorites = () => favs.length === MAX_FAVS_SIZE;

  return (
    <FavoritesContext.Provider
      value={{
        favs,
        toggleFavorite,
        isFavorite,
        setCustomName,
        customNames,
        isFilledFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
