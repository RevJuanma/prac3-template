import React from "react";
import "./home.css"
import PokeCard from "../../components/PokeCard/PokeCard"
import useLocalStorage from "../../hooks/useLocalStorage";

const HomeScreen=()=>{
    const [misPokemons] = useLocalStorage("misPokemons", []);
     const count= misPokemons.length
     const max=50
    return(
        <>
        <h1>TCG Pokemon</h1>
        <h2>Pokemons {count}/{max}</h2>
        <div className="pokecards-container">
            <PokeCard id={misPokemons}/> 
        </div>
        </>
    )
}

export default HomeScreen