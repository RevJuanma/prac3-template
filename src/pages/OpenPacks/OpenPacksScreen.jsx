import React from "react";
import { useState } from "react";
import {getRandomPokemonIds} from "../../functions/idGenerator"
import PokeCard from "../../components/PokeCard/PokeCard";


const OpenPacksScreen=()=>{
    const [ids, setIds] = useState(null);
    return(
        <>
        <h1>Abrir Sobres</h1>
        <button onClick={() => setIds(getRandomPokemonIds(5))}>Abrir sobre de 5 cartas</button>
        <button onClick={() => setIds(getRandomPokemonIds(6))}>
            Abrir sobre de 6 cartas
        </button>
        <div className="pokecards-container">
            <PokeCard id={ids}/> 
        </div>
        </>
    )
}

export default OpenPacksScreen