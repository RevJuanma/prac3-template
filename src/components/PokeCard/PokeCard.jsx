import React from "react";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useMyPokemons from "../../hooks/useMyPokemons";
import useMyFavorites from "../../hooks/useMyfavorites";

const PokeCard = ({ id }) => {
  const { data, loading, error } = usePokemon(id);
  const { collection, agregarPokemon } = useMyPokemons();
  const { favorites, agregarFavorito } = useMyFavorites();

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

          {!collection.includes(pokemon.id) && (
            <button onClick={() => agregarPokemon(pokemon.id)}>
              Agregar a la colección
            </button>
          )}

          {collection.includes(pokemon.id) && !favorites.includes(pokemon.id) && (
            <button onClick={() => agregarFavorito(pokemon.id)}>
              Agregar a Favoritos
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default PokeCard;
