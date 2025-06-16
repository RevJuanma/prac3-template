import React from "react";
import { useGame } from '../src/contexts/GameContext.jsx';
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";
import "../src/App.css";

function Home() {
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

  return (
    <div className="page-content">
      <h1>Bienvenido a tu colección de Cartas Pokémon</h1>
      <p>¡Explora y organiza tus cartas favoritas!</p>

      <h2>Cartas en tu mazo: {deck.length}/50</h2>

      {deck.length === 0 ? (
        <p>Aún no tienes cartas en tu mazo. ¡Ve a "Mis Cartas" o "Abrir Sobres" para empezar!</p>
      ) : (
        <div className="card-list-container">
          {deck.map((card) => (
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
              context="home"
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
