import useLocalStorage from "./useLocalStorage";

const useMyTeam = () => {
  const [team, setTeam] = useLocalStorage("miEquipo", []);

  const agregarAlEquipo = (pokemonId) => {
    if (!team.includes(pokemonId)) {
      setTeam([...team, pokemonId]);
    }
  };

  const eliminarDelEquipo = (pokemonId) => {
    setTeam(team.filter(id => id !== pokemonId));
  };

  return {
    team,
    agregarAlEquipo,
    eliminarDelEquipo,
  };
};

export default useMyTeam;
