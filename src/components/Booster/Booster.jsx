import React, { useMemo } from "react";
import PokemonCard from "../Card/Card";
import { useDeck } from "../../context/DeckContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function PokemonBooster({ name, count = 6 }) {
  // Obtén las funciones del contexto de mazo
  const { toggleDeck, isInDeck } = useDeck();

  // Genera un array de IDs aleatorios de Pokémon
  const pokemonIds = useMemo(() => {
    return Array.from({ length: 151 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }, [count]);

  return (
    <div>
      <h1>Sobre {name} de Pokémon</h1>
      <div className="pokemon-row">
        {pokemonIds.map((id) => {
          // Define la acción "Agregar al mazo" o "Quitar del mazo" según el estado
          const inDeck = isInDeck(id);
          const deckAction = {
            key: `deck-action-${id}`,
            label: inDeck ? "Quitar del mazo" : "Agregar al mazo",
            icon: inDeck ? <FaMinus /> : <FaPlus />,
            onClick: () => toggleDeck(id),
          };

          return <PokemonCard key={id} id={id} actions={[deckAction]} />;
        })}
      </div>
    </div>
  );
}