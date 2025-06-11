import "./App.css";
import PokemonCard from "./components/Card/Card";

export default function App() {
  // Randomizar IDs de Pokémon
  const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div>
      <h1>Sobre Premium de Pokémon</h1>
      <div className="pokemon-row">
        {pokemonIds.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
