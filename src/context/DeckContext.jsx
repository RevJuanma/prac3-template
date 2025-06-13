import React, { useContext, useState } from "react";

export const DeckContext = React.createContext();
export function DeckProvider({ children }) {
  const [deck, setDeck] = useState([]);
  const toggleDeck = (id) =>
    setDeck((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );
  const isInDeck = (id) => deck.includes(id);
  return (
    <DeckContext.Provider value={{ deck, toggleDeck, isInDeck }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);
  return context;
}
