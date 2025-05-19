import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./PokeCard.css"

function PokeCard ({pokeUrl}) {
      const [pokemon, setPokemon] = useState();

  useEffect (() => {      
      fetch(pokeUrl)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
    }, [pokeUrl]);
    return (
      <>
      <div className="pokeCardFondo">
        <div className="pokeCard">
          <div className = "pokeCardSuperior">
            <label>{pokemon?.name.toUpperCase()} LV.10</label>
            <label>HP <nav>{pokemon?.stats?.[0]?.base_stat}</nav></label>
          </div>
          <img className="pokeCardImg" src={pokemon?.sprites.front_default} alt={pokemon?.name}/>
          <div className="pokeCardInferior">
            <div>
            ABILITY: {pokemon?.abilities?.[0].ability.name.toUpperCase()}
            </div>
            <div className="pokeMovs">
              MOVES: 
              <ul>{pokemon?.moves?.[0]?.move.name.toUpperCase()}</ul>
              <ul>{pokemon?.moves?.[1]?.move.name.toUpperCase()}</ul>
              <ul>{pokemon?.moves?.[2]?.move.name.toUpperCase()}</ul>
            </div>
            <div className="pokeXp">
              EXP: {pokemon?.base_experience}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }


export default PokeCard