import React, { useContext, useState } from "react";

export const FavoritesContext = React.createContext();
export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState([]);
  const toggleFavorite = (id) =>
    setFavs((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );
  const isFavorite = (id) => favs.includes(id);
  return (
    <FavoritesContext.Provider value={{ favs, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
}
