import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard - Lucrecia Galarza";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchAndSetPokemon("pachirisu");
  }, []);

  const fetchAndSetPokemon = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const data = await response.json();

      const moveName = data.moves[0]?.move.name || null;
      let moveDesc = "Descripción no disponible";

      if (moveName) {
        const moveResponse = await fetch(data.moves[0].move.url);
        const moveData = await moveResponse.json();

        const spanishEntry = moveData.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );

        moveDesc = spanishEntry
          ? spanishEntry.flavor_text.replace(/\n|\f/g, " ")
          : "Descripción no disponible";
      }

      const image =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default ||
        data.sprites.other["dream_world"].front_default ||
        data.sprites.other["home"].front_default ||
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

      const formattedPokemon = {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        image,
        specialMove: moveName ? moveName.replace("-", " ") : "Movimiento desconocido",
        moveDesc,
        stats: [
          { name: "HP", value: data.stats[0].base_stat },
          { name: "Ataque", value: data.stats[1].base_stat },
          { name: "Defensa", value: data.stats[2].base_stat },
          { name: "Velocidad", value: data.stats[5].base_stat },
        ],
      };

      setPokemon(formattedPokemon);
    } catch (error) {
      alert("No se encontró ese Pokémon. Revisá el nombre.");
    }
  };

  const handleSearch = () => {
    if (search) fetchAndSetPokemon(search);
  };

  return (
    <div className="App">
      <img
        src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png"
        alt="Pokémon logo"
        className="logo-pokemon"
      />
      <h1>¡Carta Especial de {pokemon?.name || "..."}!</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscá un Pokémon (ej: pikachu)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {pokemon && <PokeCard pokemon={pokemon} />}
    </div>
  );
}

export default App;
