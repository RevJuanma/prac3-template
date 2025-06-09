import React from "react";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useLocalStorage from "../../hooks/useLocalStorage";

const PokeCard = ({ id }) => {
  const { data, loading, error } = usePokemon(id);
  const [collection, setCollection] = useLocalStorage("misPokemons", []);

  const agregarPokemon = (pokemonId) => {
    if (!collection.includes(pokemonId)) {
      setCollection([...collection, pokemonId]);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(data)) return null;

  return (
    <>
      {data.map((pokemon) => (
        <div className="poke-card" key={pokemon.id}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
          <p>Tipo(s): {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          <button
            onClick={() => agregarPokemon(pokemon.id)}
            disabled={collection.includes(pokemon.id)}
          >
            {collection.includes(pokemon.id)
              ? "Ya en tu coleccion"
              : "Agregar a la coleccion"}
          </button>
        </div>
      ))}
    </>
  );
};

export default PokeCard;
