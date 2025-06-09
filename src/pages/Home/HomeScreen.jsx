import React from "react";
import "./home.css"
import PokeCard from "../../components/PokeCard/PokeCard"
import useLocalStorage from "../../hooks/useLocalStorage";

const HomeScreen=()=>{
    const [misPokemons] = useLocalStorage("misPokemons", []);
    return(
        <>
        <h1>TCG Pokemon</h1>
        <div className="pokecards-container">
            <PokeCard id={misPokemons}/> 
        </div>
        </>
    )
}

export default HomeScreen