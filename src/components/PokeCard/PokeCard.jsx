import React from "react";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useLocalStorage from "../../hooks/useLocalStorage";

const PokeCard = ({ id }) => {
  const { data, loading, error } = usePokemon(id);
  const [collection, setCollection] = useLocalStorage("misPokemons", []);
  const [fovorites,setFavorites]= useLocalStorage("misFavoritos",[])

  const agregarPokemon = (pokemonId) => {
    if (!collection.includes(pokemonId)) {
      setCollection([...collection, pokemonId]);
    }
  };

    const agregarFavorito = (pokemonId) => {
    if (collection.includes(pokemonId)) {
      setFavorites([...fovorites, pokemonId]);
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
          
          {!collection.includes(pokemon.id) && <button 
            onClick={() => agregarPokemon(pokemon.id)}
            disabled={collection.includes(pokemon.id)}
          >
            Agregar a la coleccion
          </button>}
                    {collection.includes(pokemon.id) && <button 
            onClick={() => agregarFavorito(pokemon.id)}
          >
            Agregar a Favoritos
          </button>}
        </div>
      ))}
    </>
  );
};

export default PokeCard;
