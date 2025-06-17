import React from "react";
import usePokemon from "../../hooks/usePokemon"; 
import "../../Styles/cardStyle.css";

function PokeCard({ id, onSelect, isSelectable = false, isSelected = false, showDeckActions = false, onDeleteFromMazo }) {
    const { pokemonData, loading, error } = usePokemon(id);

    if (loading) return null;
    if (error) return null;
    if (!pokemonData) return null;

    const type = pokemonData.types[0].type.name;
    const displayName = pokemonData.name;

    return (
        <div>
            <div className={`card ${isSelected ? 'selected-card' : ''}`} style={{backgroundColor: getColorByType(type), border: `5px solid ${getBorderColorByType(type)}`}}>
                <div className="align-text"> <h2>{displayName}</h2> 
                </div>
                <p>ID:{pokemonData.id}</p>
                <img className="imagen-fondo" src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
                <div>
                    <strong>Stats:</strong>
                    <p>HP:{pokemonData.stats[0].base_stat}</p>
                    <p>Attack:{pokemonData.stats[1].base_stat}</p>
                    <p>Defense:{pokemonData.stats[2].base_stat}</p>
                    <p>Special Attack:{pokemonData.stats[3].base_stat}</p>
                    <p>Special Defense:{pokemonData.stats[4].base_stat}</p>
                    <p>Speed: {pokemonData.stats[5].base_stat}</p>
                </div>
            </div>
            {isSelectable && (
                <div>
                    <button onClick={() => onSelect(pokemonData)}>
                        {isSelected ? "Seleccionado" : "Seleccionar"}
                    </button>
                </div>
            )}
            {showDeckActions && (
                <div>
                    <button onClick={() => onDeleteFromMazo(pokemonData.id)}>Quitar del Mazo</button>
                </div>
            )}
        </div>
    );
}


function getColorByType(type){
    const colors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
    return colors[type] || "#F8F8F8";
}

function getBorderColorByType(type) {
    const borderColors = {
        fire: "#FDDFDF",
        grass: "#DEFDE0",
        water: "#DEF3FD",
        electric: "#FCF7DE",
        psychic: "#eaeda1",
        normal: "#F5F5F5",
        bug: "#f8d5a3",
        poison: "#AF91AA",
        ground: "#f4e7da",
        rock: "#d5d5d4",
        fairy: "#fceaff",
        fighting: "#E6E0D4",
        dragon: "#97b3e6",
        flying: "#F5F5F5",
    };
    return borderColors[type] || "#ccc";
}

export default PokeCard;