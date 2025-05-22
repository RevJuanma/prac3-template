import { useEffect, useState } from "react";
import PokeCardGuillermoViera from "./components/PokeCard-GuillermoViera";

function App() {
  
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/snorlax")
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return <div>{pokemon && <PokeCardGuillermoViera pokemon={pokemon} />}</div>;
}

export default App;
