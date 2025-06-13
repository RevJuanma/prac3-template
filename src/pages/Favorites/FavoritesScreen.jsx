import React from "react";
import "./FavoritesScreen.css"
import PokeCard from "../../components/PokeCard/PokeCard"
import useLocalStorage from "../../hooks/useLocalStorage";

const FavoritesScreen=()=>{
    const [misFavoritos] = useLocalStorage("misFavoritos", []);
     const count= misFavoritos.length
     const max=10
    return(
        <>
        <h1>Pokemons Favoritos</h1>
        <h2>Pokemons {count}/{max}</h2>
        <div className="pokecards-container">
            <PokeCard id={misFavoritos}/> 
        </div>
        </>
    )
}

export default FavoritesScreen