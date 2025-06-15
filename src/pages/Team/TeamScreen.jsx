import React from "react";
import PokeCard from "../../components/PokeCard/PokeCard";
import useMyTeam from "../../hooks/useMyTeam";

const TeamScreen=()=>{
    const { team }=useMyTeam()
    return(
        <>
        <h1>Equipo</h1>
        <div className="pokecards-container">
            <PokeCard id={team} /> 
        </div>
        </>
    )
}

export default TeamScreen