import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useGameStore } from '../utils/store';
import './Favorites.css';

const Favorites = () => {
  const { favoriteCards } = useGameStore();

  return (
    <div className="favorites-container">
      <h1>Your Favorite Cards ({favoriteCards.length}/10)</h1>
      <div className="card-grid">
        {favoriteCards.length > 0 ? (
          favoriteCards.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} isFavorite={true} />
          ))
        ) : (
          <p>You don't have any favorite cards yet. Add some from your deck!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;