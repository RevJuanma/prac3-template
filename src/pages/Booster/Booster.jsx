import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import Card from '../../components/Card/Card';
import Notification from '../../components/Notification/Notification';
import { fetchPokemon, getRandomPokemonIds } from '../../api/pokemonApi';
import styles from './Booster.module.css';

const BoosterPage = () => {
    const { points, setPoints, addCardToDeck, showNotification } = useGame();
    const [revealedCards, setRevealedCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBoosterType, setSelectedBoosterType] = useState(null);
    const [selectedCardsCount, setSelectedCardsCount] = useState(0);
    const [tempSelectedCards, setTempSelectedCards] = useState([]);

    const openBooster = async (type) => {
        let cost;
        let numPossibleCards;

        if (type === 'basic') {
            cost = 5;
            numPossibleCards = 5;
        } else {
            cost = 8;
            numPossibleCards = 6;
        }

        if (points < cost) {
            showNotification('No tienes suficientes puntos para abrir este sobre.', 'error');
            return;
        }

        setIsLoading(true);
        setRevealedCards([]);
        setSelectedBoosterType(type);
        setSelectedCardsCount(0);
        setTempSelectedCards([]);
        setPoints(prevPoints => prevPoints - cost);

        try {
            const randomIds = getRandomPokemonIds(numPossibleCards);
            const fetchedCards = await Promise.all(randomIds.map(id => fetchPokemon(id)));

            setRevealedCards(fetchedCards);
            showNotification(`¡Has abierto un sobre ${type}! Elige tus cartas.`, 'success');

        } catch (error) {
            console.error("Error al abrir el sobre:", error);
            showNotification('Error al abrir el sobre. Inténtalo de nuevo.', 'error');
            setPoints(prevPoints => prevPoints + cost);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardSelection = (card) => {
        const isCardAlreadySelected = tempSelectedCards.some(c => c.id === card.id);

        if (isCardAlreadySelected) {
            setTempSelectedCards(prev => prev.filter(c => c.id !== card.id));
            setSelectedCardsCount(prev => prev - 1);
        } else {
            if (selectedBoosterType === 'basic' && selectedCardsCount < 1) {
                setTempSelectedCards([card]);
                setSelectedCardsCount(1);
            } else if (selectedBoosterType === 'premium' && selectedCardsCount < 2) {
                setTempSelectedCards(prev => [...prev, card]);
                setSelectedCardsCount(prev => prev + 1);
            } else {
                showNotification('Ya has seleccionado el máximo de cartas para este sobre.', 'warning');
            }
        }
    };

    const confirmSelection = () => {
        tempSelectedCards.forEach(card => {
            addCardToDeck(card);
        });
        showNotification(`¡${tempSelectedCards.length} carta(s) añadida(s) a tu mazo!`, 'success');
        setRevealedCards([]);
        setSelectedBoosterType(null);
        setSelectedCardsCount(0);
        setTempSelectedCards([]);
    };

    const cancelBooster = () => {
        setRevealedCards([]);
        setSelectedBoosterType(null);
        setSelectedCardsCount(0);
        setTempSelectedCards([]);
        showNotification('Selección de sobre cancelada.', 'info');
    };

    const maxSelections = selectedBoosterType === 'basic' ? 1 : selectedBoosterType === 'premium' ? 2 : 0;
    const canConfirm = selectedCardsCount === maxSelections;

    return (
        <div className={styles.boosterPage}>
            <h2>Abrir Sobres de Cartas</h2>
            <Notification />

            {!revealedCards.length && (
                <div className={styles.boosterOptions}>
                    <div className={styles.boosterCard}>
                        <h3>Sobre Básico</h3>
                        <p>Costo: 5 puntos</p>
                        <p>Elige 1 carta entre 5 posibles.</p>
                        <button onClick={() => openBooster('basic')} disabled={isLoading || points < 5}>
                            Abrir Básico
                        </button>
                    </div>
                    <div className={styles.boosterCard}>
                        <h3>Sobre Premium</h3>
                        <p>Costo: 8 puntos</p>
                        <p>Elige 2 cartas entre 6 posibles.</p>
                        <button onClick={() => openBooster('premium')} disabled={isLoading || points < 8}>
                            Abrir Premium
                        </button>
                    </div>
                </div>
            )}

            {isLoading && <p>Abriendo sobre...</p>}

            {revealedCards.length > 0 && (
                <div className={styles.revealedCards}>
                    <h3>
                        Selecciona {maxSelections} carta(s) ({selectedCardsCount} de {revealedCards.length})
                    </h3>
                    <p className={styles.selectionInfo}>Haz clic en una carta para seleccionarla/deseleccionarla.</p>
                    <div className={styles.cardGrid}>
                        {revealedCards.map((pokemon) => {
                            const isSelected = tempSelectedCards.some(c => c.id === pokemon.id);
                            return (
                                <div
                                    key={pokemon.id}
                                    className={`${styles.boosterSelectionCard} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => handleCardSelection(pokemon)}
                                >
                                    <Card pokemon={pokemon} source="booster-selection" />
                                    {isSelected && <div className={styles.selectedOverlay}>✓</div>}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.boosterActionButtons}>
                        <button
                            onClick={confirmSelection}
                            disabled={!canConfirm}
                            className={styles.confirmBoosterButton}
                        >
                            Confirmar Selección ({selectedCardsCount}/{maxSelections})
                        </button>
                        <button onClick={cancelBooster} className={styles.cancelBoosterButton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoosterPage;