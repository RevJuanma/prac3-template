import React, { createContext, useState, useContext, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('pokemonGamePoints');
    return savedPoints ? parseInt(savedPoints, 10) : 100;
  });

  const [deck, setDeck] = useState(() => {
    const savedDeck = localStorage.getItem('pokemonGameDeck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('pokemonGameFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('pokemonGameTeam');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokemonGamePoints', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('pokemonGameDeck', JSON.stringify(deck));
  }, [deck]);

  useEffect(() => {
    localStorage.setItem('pokemonGameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('pokemonGameTeam', JSON.stringify(team));
  }, [team]);

  const addPoints = (amount) => {
    setPoints(prevPoints => prevPoints + amount);
  };

  const subtractPoints = (amount) => {
    if (points >= amount) {
      setPoints(prevPoints => prevPoints - amount);
      return true;
    }
    return false;
  };

  const addCardToDeck = (card) => {
    setDeck(prevDeck => {
      if (prevDeck.length >= 50) {
        addPoints(2);
        alert("¡Mazo lleno! La carta ha sido descartada y recibiste 2 puntos.");
        return prevDeck;
      }
      return [...prevDeck, card];
    });
  };

  const removeCardFromDeck = (cardId) => {
    setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
  };

  const deleteCardForPoints = (cardId) => {
    const cardExistsInDeck = deck.some(card => card.id === cardId);
    if (cardExistsInDeck) {
      removeCardFromDeck(cardId);
      removeCardFromFavorites(cardId);
      removeCardFromTeam(cardId);
      addPoints(1);
      alert("Carta eliminada del mazo y recibiste 1 punto.");
    } else {
      alert("La carta no se encuentra en el mazo.");
    }
  };

  const isCardInDeck = (cardId) => deck.some(card => card.id === cardId);

  const addCardToFavorites = (card) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.length >= 10) {
        alert("¡La sección de favoritos está llena (máximo 10 cartas)!");
        return prevFavorites;
      }
      if (prevFavorites.some(favCard => favCard.id === card.id)) {
        alert("¡Esta carta ya está en tus favoritos!");
        return prevFavorites;
      }
      return [...prevFavorites, card];
    });
  };

  const removeCardFromFavorites = (cardId) => {
    setFavorites(prevFavorites => prevFavorites.filter(card => card.id !== cardId));
  };

  const renameFavoriteCard = (cardId, newName) => {
    setFavorites(prevFavorites =>
      prevFavorites.map(card =>
        card.id === cardId ? { ...card, customName: newName } : card
      )
    );
  };

  const resetFavoriteCardName = (cardId) => {
    setFavorites(prevFavorites =>
      prevFavorites.map(card => {
        if (card.id === cardId) {
          const { customName, ...rest } = card;
          return rest;
        }
        return card;
      })
    );
  };

  const isCardInFavorites = (cardId) => favorites.some(card => card.id === cardId);

  const addCardToTeam = (card) => {
    setTeam(prevTeam => {
      if (prevTeam.length >= 6) {
        alert("¡Tu equipo Pokémon está lleno (máximo 6 cartas)!");
        return prevTeam;
      }
      if (prevTeam.some(teamCard => teamCard.id === card.id)) {
        alert("¡Esta carta ya está en tu equipo!");
        return prevTeam;
      }
      return [...prevTeam, card];
    });
  };

  const removeCardFromTeam = (cardId) => {
    setTeam(prevTeam => prevTeam.filter(card => card.id !== cardId));
  };

  const isCardInTeam = (cardId) => team.some(card => card.id === cardId);

  const contextValue = {
    points,
    setPoints,
    addPoints,
    subtractPoints,
    deck,
    addCardToDeck,
    removeCardFromDeck,
    deleteCardForPoints,
    isCardInDeck,
    favorites,
    addCardToFavorites,
    removeCardFromFavorites,
    renameFavoriteCard,
    resetFavoriteCardName,
    isCardInFavorites,
    team,
    addCardToTeam,
    removeCardFromTeam,
    isCardInTeam,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
