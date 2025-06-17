import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import Notification from '../../components/Notification/Notification';
import styles from './Home.module.css';

const HomePage = () => {
    const { deck } = useGame();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDeck = deck.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (currentDeck.length === 0 && currentPage > 1 && deck.length > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }, [deck, currentDeck.length, currentPage]);

    return (
        <div className={styles.homePage}>
            <h2>Tu Mazo de Cartas Pokémon ({deck.length}/50)</h2>
            <Notification />
            {deck.length === 0 ? (
                <p>Tu mazo está vacío. ¡Abre algunos sobres para empezar!</p>
            ) : (
                <>
                    <div className={styles.cardGrid}>
                        {currentDeck.map((pokemon) => (
                            <Card key={pokemon.id} pokemon={pokemon} source="deck" />
                        ))}
                    </div>
                    <Pagination
                        totalItems={deck.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;