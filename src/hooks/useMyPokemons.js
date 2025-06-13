import useLocalStorage from "./useLocalStorage";

const useMyPokemons = () => {
  const [collection, setCollection] = useLocalStorage("misPokemons", []);

  const agregarPokemon = (pokemonId) => {
    if (!collection.includes(pokemonId)) {
      setCollection([...collection, pokemonId]);
    }
  };

  const eliminarPokemon = (pokemonId) => {
    setCollection(collection.filter(id => id !== pokemonId));
  };

  return {
    collection,
    agregarPokemon,
    eliminarPokemon,
  };
};

export default useMyPokemons;
