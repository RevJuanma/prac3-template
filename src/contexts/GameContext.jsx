import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [points, setPoints] = useState(() => parseInt(localStorage.getItem('points') || '100', 10));
    const [deck, setDeck] = useState(() => JSON.parse(localStorage.getItem('deck') || '[]'));
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const [team, setTeam] = useState(() => JSON.parse(localStorage.getItem('team') || '[]'));
    const [notification, setNotification] = useState(null);

    const MAX_DECK_SIZE = 50;
    const MAX_FAVORITES = 10;
    const MAX_TEAM_SIZE = 6; 

    useEffect(() => {
        localStorage.setItem('points', points.toString());
    }, [points]);

    useEffect(() => {
        localStorage.setItem('deck', JSON.stringify(deck));
    }, [deck]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('team', JSON.stringify(team));
    }, [team]);
    // ----------------------------------------------------

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        const timer = setTimeout(() => {
            setNotification(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const addCardToDeck = useCallback((card) => {
        setDeck((prevDeck) => {
            if (prevDeck.length >= MAX_DECK_SIZE) {
                setPoints((prevPoints) => prevPoints + 2);
                showNotification(`Mazo lleno. ${card.name} fue descartado por 2 puntos.`, 'warning');
                return prevDeck;
            }

            const cardWithCustomName = { ...card, customName: null };
            showNotification(`${card.name} agregado al mazo.`, 'success');
            return [...prevDeck, cardWithCustomName];
        });
    }, [showNotification]);

    const removeCardFromDeck = useCallback((cardId) => {
        setDeck((prevDeck) => {
            const updatedDeck = prevDeck.filter(card => card.id !== cardId);
            const cardToRemove = prevDeck.find(card => card.id === cardId);
            if (cardToRemove) {
                 showNotification(`${cardToRemove.customName || cardToRemove.name} eliminada del mazo.`, 'info');
            }
            return updatedDeck;
        });
    }, [showNotification]);

    const addCardToFavorites = useCallback((card) => {
        if (favorites.some(fav => fav.id === card.id)) {
            showNotification(`${card.customName || card.name} ya está en favoritos.`, 'info');
            return;
        }
        if (favorites.length >= MAX_FAVORITES) {
            showNotification('La sección de favoritos está llena (máximo 10 cartas).', 'error');
            return;
        }
        setFavorites((prevFavs) => {
            const cardWithCustomName = { ...card, customName: card.customName || null };
            showNotification(`${card.customName || card.name} agregado a favoritos.`, 'success');
            return [...prevFavs, cardWithCustomName];
        });
    }, [favorites, showNotification]);

    const removeCardFromFavorites = useCallback((cardId) => {
        setFavorites((prevFavs) => {
            const cardToRemove = prevFavs.find(card => card.id === cardId);
            const updatedFavs = prevFavs.filter(card => card.id !== cardId);
            if (cardToRemove) {
                 showNotification(`${cardToRemove.customName || cardToRemove.name} eliminada de favoritos.`, 'info');
            }
            return updatedFavs;
        });
    }, [showNotification]);


    const renameCard = useCallback((cardId, newName, collectionType) => {
        if (collectionType === 'favorites') {
            setFavorites((prevFavs) =>
                prevFavs.map((card) =>
                    card.id === cardId ? { ...card, customName: newName } : card
                )
            );
        } else if (collectionType === 'deck') {
            setDeck((prevDeck) =>
                prevDeck.map((card) =>
                    card.id === cardId ? { ...card, customName: newName } : card
                )
            );
        }
        showNotification(`Nombre actualizado a "${newName}".`, 'success');
    }, [showNotification]);


    const renameFavoriteCard = useCallback((cardId, newName) => {
        renameCard(cardId, newName, 'favorites');
    }, [renameCard]);


    const renameDeckCard = useCallback((cardId, newName) => {
        renameCard(cardId, newName, 'deck');
    }, [renameCard]);


    const resetCardName = useCallback((cardId, collectionType) => {
        if (collectionType === 'favorites') {
            setFavorites((prevFavs) =>
                prevFavs.map((card) =>
                    card.id === cardId ? { ...card, customName: null } : card
                )
            );
        } else if (collectionType === 'deck') {
            setDeck((prevDeck) =>
                prevDeck.map((card) =>
                    card.id === cardId ? { ...card, customName: null } : card
                )
            );
        }
        showNotification(`Nombre reseteado.`, 'info');
    }, [showNotification]);

 
    const resetFavoriteCardName = useCallback((cardId) => {
        resetCardName(cardId, 'favorites');
    }, [resetCardName]);


    const resetDeckCardName = useCallback((cardId) => {
        resetCardName(cardId, 'deck');
    }, [resetCardName]);

    const addCardToTeam = useCallback((card) => {
        if (team.some(teamCard => teamCard.id === card.id)) {
            showNotification(`${card.customName || card.name} ya está en tu equipo.`, 'info');
            return;
        }
        if (team.length >= MAX_TEAM_SIZE) {
            showNotification('El equipo Pokémon está lleno (máximo 6 cartas).', 'error');
            return;
        }
        setTeam((prevTeam) => {
            const cardWithCustomName = { ...card, customName: card.customName || null };
            showNotification(`${card.customName || card.name} agregado al equipo.`, 'success');
            return [...prevTeam, cardWithCustomName];
        });
    }, [team, showNotification]);

    const removeCardFromTeam = useCallback((cardId) => {
        setTeam((prevTeam) => {
            const cardToRemove = prevTeam.find(card => card.id === cardId);
            const updatedTeam = prevTeam.filter(card => card.id !== cardId);
            if (cardToRemove) {
                showNotification(`${cardToRemove.customName || cardToRemove.name} eliminada del equipo.`, 'info');
            }
            return updatedTeam;
        });
    }, [showNotification]);


    const removeCardForPoints = useCallback((cardId, source) => {
        if (source === 'deck') {
            setDeck((prevDeck) => {
                const cardToRemove = prevDeck.find(card => card.id === cardId);
                const updatedDeck = prevDeck.filter(card => card.id !== cardId);
                if (cardToRemove) {
                     showNotification(`${cardToRemove.customName || cardToRemove.name} eliminada y 2 puntos añadidos.`, 'success');
                }
                return updatedDeck;
            });
        }
        setPoints((prevPoints) => prevPoints + 2);
    }, [showNotification]);

    const value = {
        points,
        setPoints,
        deck,
        addCardToDeck,
        removeCardFromDeck,
        favorites,
        addCardToFavorites,
        removeCardFromFavorites,
        renameFavoriteCard,
        resetFavoriteCardName,
        team,
        addCardToTeam,
        removeCardFromTeam,
        removeCardForPoints,
        notification,
        showNotification,
        renameDeckCard,
        resetDeckCardName,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    return useContext(GameContext);
};