import React from "react";
import useDeck from "../../hooks/useDeck";
import PokeCard from "../../components/cards/PokeCard";
import "../../Styles/mazoStyle.css";

function MazoPage() {
    const { mazo, quitarCartaDelMazo } = useDeck(); 

return (
<div>
<h1 className="title-center">Mi Mazo</h1>
<h3 className="text-left">Cartas en el mazo: {mazo.length}/50</h3> 

{mazo.length === 0 ? (
<p className="no-cards-message">Tu mazo está vacío.</p>
) : (
    <div className="cards-container">
        {mazo.map((pokemon) => (
            <PokeCard
            key={pokemon.id}
            id={pokemon.id}
            isSelectable={false}
            showDeckActions={true}
            onDeleteFromMazo={() => quitarCartaDelMazo(pokemon.id)}/>
            ))}
    </div>
    )}
</div>
    );
}

export default MazoPage;