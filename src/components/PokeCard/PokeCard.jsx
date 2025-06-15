import React from "react";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useMyPokemons from "../../hooks/useMyPokemons";
import useMyFavorites from "../../hooks/useMyfavorites";
import usePoints from "../../hooks/usePoints";
import {useHasReachedCollectionLimit, useHasReachedFavoritesLimit} from "../../hooks/useLimits"

const PokeCard = ({ id }) => {
  const stateCollection=useHasReachedCollectionLimit();
  const stateFavorites=useHasReachedFavoritesLimit();
  const {sumarPoints}=usePoints()
  const { data, loading, error } = usePokemon(id);
  const { collection, agregarPokemon, eliminarPokemon } = useMyPokemons();
  const { favorites, agregarFavorito, eliminarFavorito } = useMyFavorites();

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

          {!collection.includes(pokemon.id) && !stateCollection && (
            <button onClick={() => {agregarPokemon(pokemon.id); eliminarFavorito(pokemon.id);window.location.reload()}}>
              Agregar a la colección
            </button>
          )}

          {collection.includes(pokemon.id) && !favorites.includes(pokemon.id) && !stateFavorites && (
            <button onClick={() => {agregarFavorito(pokemon.id); eliminarPokemon(pokemon.id);window.location.reload()}}>
              Agregar a Favoritos
            </button>
          )}

          {collection.includes(pokemon.id) && !favorites.includes(pokemon.id) && (
            <button onClick={()=>{eliminarPokemon(pokemon.id);sumarPoints(1);window.location.reload()}}>Liberar por Puntos</button>
          )

          }
        </div>
      ))}
    </>
  );
};

export default PokeCard;
