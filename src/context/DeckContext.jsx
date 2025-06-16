import React, { useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
import { FavoritesContext } from "./FavoritesContext";
import { TeamContext } from "./TeamContext";
export const MAX_DECK_SIZE = 50;

export const DeckContext = React.createContext();
export function DeckProvider({ children }) {
  const { favs, isFavorite } = useContext(FavoritesContext);
  const { isInTeam } = useContext(TeamContext);
  const [deck, setDeck] = useLocalStorage("deck", []);

  const isInDeck = (id) => deck.includes(id);
  const toggleDeck = (id) => {
    setDeck((curr) => {
      if (curr.includes(id)) {
        if (isFavorite(id) || isInTeam(id)) return curr;
        return curr.filter((x) => x !== id);
      } else {
        const nonFavCount = curr.filter((x) => !favs.includes(x)).length;
        if (nonFavCount < MAX_DECK_SIZE) return [...curr, id];
        return curr;
      }
    });
  };

  const deckSize = () => deck.filter((id) => !favs.includes(id)).length;
  const availableSlots = () => MAX_DECK_SIZE - deckSize();

  return (
    <DeckContext.Provider
      value={{
        deck,
        toggleDeck,
        isInDeck,
        deckSize,
        availableSlots,
        isFilled: () => deckSize() >= MAX_DECK_SIZE,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) throw new Error("useDeck debe usarse dentro de DeckProvider");
  return context;
}
