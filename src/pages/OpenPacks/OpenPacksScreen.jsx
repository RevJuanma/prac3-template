import React from "react";
import { useState } from "react";
import {getRandomPokemonIds} from "../../functions/idGenerator"
import PokeCard from "../../components/PokeCard/PokeCard";
import usePoints from "../../hooks/usePoints";
import {useHasReachedPointsLimit} from "../../hooks/useLimits"


const OpenPacksScreen=()=>{
    const pointsState=useHasReachedPointsLimit();
    const {points , restarPoints}=usePoints()
    const [ids, setIds] = useState(null);
    return(
        <>
        <h1>Abrir Sobres</h1>
        <h3>Puntos: {points}</h3>
        {pointsState && (
            <>
            <button onClick={() => {setIds(getRandomPokemonIds(5)); restarPoints(5)}}>Abrir sobre de 5 cartas</button>
            <button onClick={() => {setIds(getRandomPokemonIds(6));restarPoints(8)}}>
            Abrir sobre de 6 cartas
            </button>
            </>
        )}
        <div className="pokecards-container">
            <PokeCard id={ids}/> 
        </div>
        </>
    )
}

export default OpenPacksScreen