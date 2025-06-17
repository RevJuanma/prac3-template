import React, { useState } from 'react';
import { useGameStore } from '../utils/store';
import './PokemonCard.css'; // We'll create this

const PokemonCard = ({ pokemon, isFavorite = false }) => {
  const {
    addToDeck,
    removeFromDeck,
    addToFavorites,
    removeFromFavorites,
    removeCardForPoints,
    renameFavoriteCard,
    resetFavoriteCardName,
    addNotification,
    deck,
    favoriteCards,
    team,
    addToTeam,
    removeFromTeam,
  } = useGameStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(pokemon.customName || pokemon.name);

  const isInDeck = deck.some((card) => card.id === pokemon.id);
  const isInFavorites = favoriteCards.some((card) => card.id === pokemon.id);
  const isInTeam = team.some((card) => card.id === pokemon.id);

  const handleRename = () => {
    renameFavoriteCard(pokemon.id, newName);
    setIsRenaming(false);
    addNotification({ message: `Card renamed to "${newName}"!`, type: 'success' });
  };

  const handleResetName = () => {
    resetFavoriteCardName(pokemon.id);
    setNewName(pokemon.name);
    addNotification({ message: `Card name reset to "${pokemon.name}"!`, type: 'success' });
  };

  return (
    <div className="pokemon-card">
      <h3>{pokemon.customName || pokemon.name}</h3>
      <p>#{pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        Type(s): {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
      </p>
      <h4>Stats:</h4>
      <ul>
        {pokemon.stats.map((statInfo) => (
          <li key={statInfo.stat.name}>
            {statInfo.stat.name}: {statInfo.base_stat}
          </li>
        ))}
      </ul>
      <div className="card-actions">
        {!isFavorite && (
          <>
            {!isInDeck ? (
              <button onClick={() => addToDeck(pokemon)}>Add to Deck</button>
            ) : (
              <button onClick={() => removeFromDeck(pokemon.id)}>Remove from Deck</button>
            )}
            {!isInFavorites ? (
              <button onClick={() => addToFavorites(pokemon)}>Add to Favorites</button>
            ) : (
              <button onClick={() => removeFromFavorites(pokemon.id)}>Remove from Favorites</button>
            )}
            <button onClick={() => removeCardForPoints(pokemon.id)}>Sell for 2 Points</button>
          </>
        )}

        {isFavorite && (
          <>
            <button onClick={() => removeFromFavorites(pokemon.id)}>Remove from Favorites</button>
            {!isRenaming ? (
              <button onClick={() => setIsRenaming(true)}>Rename</button>
            ) : (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New name"
                />
                <button onClick={handleRename}>Save Name</button>
                <button onClick={() => setIsRenaming(false)}>Cancel</button>
                <button onClick={handleResetName}>Reset Name</button>
              </>
            )}
          </>
        )}

        {!isInTeam ? (
            <button onClick={() => addToTeam(pokemon)}>Add to Team</button>
          ) : (
            <button onClick={() => removeFromTeam(pokemon.id)}>Remove from Team</button>
          )}
      </div>
    </div>
  );
};

export default PokemonCard;