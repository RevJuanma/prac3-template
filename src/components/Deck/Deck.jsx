import React from "react";
import { useDeck } from "../../context/DeckContext";
import PokemonCard from "../Card/Card";

export default function Deck() {
  const { deck } = useDeck();

  if (deck.length === 0) {
    return <p>No tienes Pokémon en tu mazo</p>;
  }

  return (
    <div>
      <h1>Mazo:</h1>
      <div className="pokemon-row">
        {deck.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}