import React, { useContext, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { TeamContext } from "./TeamContext"

export const DeckContext = React.createContext();

export function DeckProvider({ children }) {
  const { favs, isFavorite } = useContext(FavoritesContext);
  const { isInTeam } = useContext(TeamContext);
  const [deck, setDeck] = useState([]);
  const isInDeck = (id) => deck.includes(id);

  const toggleDeck = (id) =>
    setDeck((curr) => {
      if (isInDeck(id)) {
        if (isFavorite(id) || isInTeam(id)) return curr; // Si está en Favoritos o en Mi Equipo, NO elimina
        return curr.filter((x) => x !== id);
      } else {
        const nonFavCount = curr.filter((x) => !favs.includes(x)).length;
        if (nonFavCount < 50) {
          return [...curr, id];
        }
        return curr;
      }
    });

  return (
    <DeckContext.Provider value={{ deck, toggleDeck, isInDeck }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck debe usarse dentro de DeckProvider");
  }
  return context;
}
