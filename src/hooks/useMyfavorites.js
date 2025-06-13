import useLocalStorage from "./useLocalStorage";

const useMyFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage("misFavoritos", []);

  const agregarFavorito = (pokemonId) => {
    if (!favorites.includes(pokemonId)) {
      setFavorites([...favorites, pokemonId]);
    }
  };

  const eliminarFavorito = (pokemonId) => {
    setFavorites(favorites.filter(id => id !== pokemonId));
  };

  return {
    favorites,
    agregarFavorito,
    eliminarFavorito,
  };
};

export default useMyFavorites;
