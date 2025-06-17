import React from 'react';
import { useGame } from '../../contexts/GameContext';
import Card from '../../components/Card/Card';
import Notification from '../../components/Notification/Notification';
import styles from './Favorites.module.css';

const FavoritesPage = () => {
    const { favorites, removeCardFromFavorites, renameFavoriteCard, resetFavoriteCardName } = useGame();

    return (
        <div className={styles.favoritesPage}>
            <h2>Tus Cartas Favoritas ({favorites.length}/10)</h2>
            <Notification />
            {favorites.length === 0 ? (
                <p className={styles.emptyFavoritesMessage}>No tienes cartas favoritas aún. ¡Agrégalas desde tu mazo o al abrir sobres!</p>
            ) : (
                <div className="cardGrid">
                    {favorites.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            pokemon={pokemon}
                            source="favorites"
                            onRemoveFromFavorites={removeCardFromFavorites}
                            onRename={renameFavoriteCard}
                            onResetName={resetFavoriteCardName}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;