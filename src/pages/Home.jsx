import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useGameStore } from '../utils/store';
import './Home.css';

const Home = () => {
  const { deck, team } = useGameStore();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const totalPages = Math.ceil(deck.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = deck.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="home-container">
      <h1>Your Deck ({deck.length}/50)</h1>
      <div className="card-grid">
        {currentCards.length > 0 ? (
          currentCards.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>Your deck is empty. Go open some boosters!</p>
        )}
      </div>

      {deck.length > cardsPerPage && (
        <div className="pagination-controls">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      <h2 className="team-title">Your Team ({team.length}/6)</h2>
      <div className="card-grid team-grid">
        {team.length > 0 ? (
          team.map((pokemon) => (
            <PokemonCard key={`team-${pokemon.id}`} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon in your team yet. Add some from your deck or favorites!</p>
        )}
      </div>
    </div>
  );
};

export default Home;