import React from "react";
import "./home.css"
import PokeCard from "../../components/PokeCard/PokeCard"
import useLocalStorage from "../../hooks/useLocalStorage";
import usePoints from "../../hooks/usePoints";
import {useHasReachedCollectionLimit} from "../../hooks/useLimits"

const HomeScreen = () => {
  const [misPokemons] = useLocalStorage("misPokemons", []);
  const { points } = usePoints();
  const count = misPokemons.length;
  const max = 50;
  const state=useHasReachedCollectionLimit()

  return (
    <>
      <h1>TCG Pokémon</h1>
      <h2></h2>
      <h2>Pokémons {count}/{max} ({state?"Yes":"No"})</h2>
      <h3>Puntos: {points}</h3>
      <div className="pokecards-container">
        <PokeCard id={misPokemons} /> 
      </div>
    </>
  );
};

export default HomeScreen;