import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useGameStore } from '../utils/store';
import { fetchRandomPokemons } from '../utils/api';
import './Booster.css';

const Booster = () => {
  const { points, deductPoints, addNotification, addToDeck } = useGameStore();
  const [revealedCards, setRevealedCards] = useState([]);
  const [selectedCardsCount, setSelectedCardsCount] = useState(0);
  const [maxSelections, setMaxSelections] = useState(0);

  const handleOpenBooster = async (type) => {
    let cost = 0;
    let numCardsToReveal = 0;
    let numCardsToSelect = 0;

    if (type === 'basic') {
      cost = 5;
      numCardsToReveal = 5;
      numCardsToSelect = 1;
    } else if (type === 'premium') {
      cost = 8;
      numCardsToReveal = 6;
      numCardsToSelect = 2;
    }

    if (points < cost) {
      addNotification({ message: `Not enough points to open a ${type} booster!`, type: 'error' });
      return;
    }

    try {
      const pokemons = await fetchRandomPokemons(numCardsToReveal);
      setRevealedCards(pokemons);
      setSelectedCardsCount(0);
      setMaxSelections(numCardsToSelect);
      deductPoints(cost);
      addNotification({ message: `Opened a ${type} booster! Select ${numCardsToSelect} card(s).`, type: 'success' });
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      addNotification({ message: 'Failed to open booster. Please try again.', type: 'error' });
    }
  };

  const handleCardSelection = (pokemon) => {
    if (selectedCardsCount < maxSelections) {
      addToDeck(pokemon);
      setSelectedCardsCount(selectedCardsCount + 1);
      addNotification({ message: `${pokemon.name} added to your deck!`, type: 'success' });
    } else {
      addNotification({ message: `You have already selected ${maxSelections} card(s) from this booster.`, type: 'error' });
    }
  };

  return (
    <div className="booster-container">
      <h1>Open Booster Packs</h1>
      <p>Points: {points}</p>

      <div className="booster-options">
        <div className="booster-pack">
          <h2>Basic Pack</h2>
          <p>Cost: 5 points</p>
          <p>Choose 1 card from 5 possible.</p>
          <button onClick={() => handleOpenBooster('basic')}>Open Basic Pack</button>
        </div>

        <div className="booster-pack">
          <h2>Premium Pack</h2>
          <p>Cost: 8 points</p>
          <p>Choose 2 cards from 6 possible.</p>
          <button onClick={() => handleOpenBooster('premium')}>Open Premium Pack</button>
        </div>
      </div>

      {revealedCards.length > 0 && (
        <div className="revealed-cards-section">
          <h2>Revealed Cards (Select {maxSelections - selectedCardsCount} more)</h2>
          <div className="card-grid">
            {revealedCards.map((pokemon) => (
              <div key={pokemon.id} className="revealed-card-wrapper">
                <PokemonCard pokemon={pokemon} />
                {selectedCardsCount < maxSelections && (
                  <button
                    className="select-card-button"
                    onClick={() => handleCardSelection(pokemon)}
                    disabled={
                      useGameStore.getState().deck.some((card) => card.id === pokemon.id) ||
                      selectedCardsCount >= maxSelections
                    }
                  >
                    Select this Card
                  </button>
                )}
              </div>
            ))}
          </div>
          {selectedCardsCount >= maxSelections && (
            <p className="selection-complete-message">You have made your selections. Go to Home to manage your deck!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Booster;