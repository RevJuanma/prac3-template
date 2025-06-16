import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from '../src/contexts/GameContext.jsx';
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";
import "../src/App.css";

function MisCartas() {
  const {
    deck,
    addCardToFavorites,
    removeCardFromFavorites,
    addCardToTeam,
    removeCardFromTeam,
    deleteCardForPoints,
    isCardInFavorites,
    isCardInTeam,
  } = useGame();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeck = deck.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.customName && card.customName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-content">
      <h1>Mis Cartas Pokémon</h1>
      <h2>Cartas en tu mazo: {deck.length}/50</h2>

      <div className="flex justify-center my-8">
        <Link to="/abrir-sobres" className="get-more-cards-button">
          ¿Quieres conseguir más cartas? ¡Ve a Abrir Sobres!
        </Link>
      </div>

      {deck.length === 0 ? (
        <p>Aún no tienes cartas en tu mazo. ¡Abre algunos sobres!</p>
      ) : (
        <div className="card-list-container">
          {filteredDeck.length === 0 && searchQuery !== "" ? (
            <p>No se encontraron cartas con "{searchQuery}" en tu mazo.</p>
          ) : (
            filteredDeck.map((card) => (
              <PokeCard
                key={card.id}
                pokemon={card}
                showActions={true}
                onAddToFavorites={() => addCardToFavorites(card)}
                onRemoveFromFavorites={() => removeCardFromFavorites(card.id)}
                onAddToTeam={() => addCardToTeam(card)}
                onRemoveFromTeam={() => removeCardFromTeam(card.id)}
                onDeleteCard={() => deleteCardForPoints(card.id)}
                isInFavorites={isCardInFavorites(card.id)}
                isInTeam={isCardInTeam(card.id)}
                context="miscartas"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MisCartas;
