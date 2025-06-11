import React from "react";
import PokemonCard from "../Card/Card";

export default function PokemonBooster({ name, count = 6 }) {
  const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return (
    <div>
      <h1>Sobre {name} de Pokémon</h1>
      <div className="pokemon-row">
        {pokemonIds.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}