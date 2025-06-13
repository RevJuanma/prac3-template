import React from "react";
import "./home.css"
import PokeCard from "../../components/PokeCard/PokeCard"
import useLocalStorage from "../../hooks/useLocalStorage";
import usePoints from "../../hooks/usePoints";

const HomeScreen = () => {
  const [misPokemons] = useLocalStorage("misPokemons", []);
  const { points } = usePoints();
  const count = misPokemons.length;
  const max = 50;

  return (
    <>
      <h1>TCG Pokémon</h1>
      <h2>Pokémons {count}/{max}</h2>
      <h3>Puntos: {points}</h3>
      <div className="pokecards-container">
        <PokeCard id={misPokemons} /> 
      </div>
    </>
  );
};

export default HomeScreen;