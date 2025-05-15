import { useEffect, useState } from "react";
import "./App.css";
import PokeCard from "./components/Rev/PokeCard";

function App() {
  const [pokeList, setPokeList] = useState();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => setPokeList(data));
  }, []);

  return (
    <div>
      {pokeList?.results?.map((pokemon) => (
        <PokeCard pokeUrl={pokemon.url}/>
      ))}
    </div>
  );
}

export default App;
