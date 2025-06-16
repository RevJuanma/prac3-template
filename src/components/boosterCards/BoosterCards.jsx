import React, { useState, useEffect } from "react";
import "../../Styles/boosterCardStyle.css";
import PokeCard from "../cards/PokeCard";

function BoosterCards({ pokemonIds, cardsToPick, onSelectionDone }) {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected([]);
    }, [pokemonIds]); 

    const toggleSelect = (pokemon) => {
        const alreadySelected = selected.some((p) => p.id === pokemon.id);
        if (alreadySelected) {
            setSelected(selected.filter((p) => p.id !== pokemon.id));
        } else if (selected.length < cardsToPick) {
            setSelected([...selected, pokemon]);

        }
    };

    const confirm = () => {
        if (selected.length === cardsToPick) {
            onSelectionDone(selected);
            setSelected([]); 
        } 
    };

    return (
        <div>
            <h1 className="title-center">Elige tus cartas</h1>
            <p>
                Seleccionadas: {selected.length} / {cardsToPick}
            </p>

            <div className="cards-container">
                {pokemonIds.map((id) => (
                    <PokeCard key={id} id={id} onSelect={toggleSelect} isSelected={selected.some((p) => p.id === id)} isSelectable={true}/>
                ))}
            </div>
            <button onClick={confirm} disabled={selected.length !== cardsToPick}>Confirmar ({selected.length}/{cardsToPick})</button>
        </div>
    );
}

export default BoosterCards;