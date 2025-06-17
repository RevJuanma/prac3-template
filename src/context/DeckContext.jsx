import React, { useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
import { FavoritesContext } from "./FavoritesContext";
import { TeamContext } from "./TeamContext";

export const MAX_DECK_SIZE = 50; // 1. Constante global límite del mazo

// 2. Creación del contexto para el mazo
export const DeckContext = React.createContext();

export function DeckProvider({ children }) {
  // 3. Acceso a favoritos y equipo desde otros contextos
  const { favs, isFavorite } = useContext(FavoritesContext);
  const { isInTeam } = useContext(TeamContext);

  // 4. Estado persistente: lista de IDs en el mazo almacenada localmente
  const [deck, setDeck] = useLocalStorage("deck", []);

  // 5. Utilidad: verifica si un ID está en el mazo
  const isInDeck = (id) => deck.includes(id);

  // 6. Función para alternar presencia de un Pokémon en el mazo
  const toggleDeck = (id) => {
    setDeck((curr) => {
      if (curr.includes(id)) {
        // 6.1 Si ya estaba en el mazo, solo eliminar si no está en favoritos ni en equipo
        if (isFavorite(id) || isInTeam(id)) return curr;
        return curr.filter((x) => x !== id);
      } else {
        // 6.2 Si no estaba, agregar solo si no excede el tamaño (excluyendo favoritos)
        const nonFavCount = curr.filter((x) => !favs.includes(x)).length;
        if (nonFavCount < MAX_DECK_SIZE) return [...curr, id];
        return curr; // si está lleno, no cambia
      }
    });
  };

  // 7. Tamaño efectivo: cuenta solo IDs no marcados como favoritos
  const deckSize = () => deck.filter((id) => !favs.includes(id)).length;
  // 8. Espacios restantes según límite
  const availableSlots = () => MAX_DECK_SIZE - deckSize();

  // 9. Proveedor de valores y funciones al resto de la app
  return (
    <DeckContext.Provider
      value={{
        deck,
        toggleDeck,
        isInDeck,
        deckSize,
        availableSlots,
        isFilled: () => deckSize() >= MAX_DECK_SIZE, // indicador de mazo lleno
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

// 10. Hook personalizado para usar contexto y validar su uso correcto
export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) throw new Error("useDeck debe usarse dentro de DeckProvider");
  return context;
}
