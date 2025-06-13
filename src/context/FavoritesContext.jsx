import React, { useContext, useState } from "react";

export const FavoritesContext = React.createContext();
export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState([]);
  const isFavorite = (id) => favs.includes(id);
  const toggleFavorite = (id) =>
    setFavs((curr) => {
      if (isFavorite(id)) {
        return curr.filter((x) => x !== id);
      } else if (curr.length < 10) {
        return [...curr, id];
      } else {
        return curr;
      }
    });

  const isFilledFavorites = () => {
    return favs.length === 10;
  }

  return (
    <FavoritesContext.Provider value={{ favs, toggleFavorite, isFavorite, isFilledFavorites }}>
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
