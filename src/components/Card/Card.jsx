import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import styles from './Card.module.css';

const Card = ({ pokemon, source }) => {
    const {
        addCardToDeck,
        removeCardFromDeck,
        addCardToFavorites,
        removeCardFromFavorites,
        renameFavoriteCard,
        resetFavoriteCardName,
        addCardToTeam,
        removeCardFromTeam,
        removeCardForPoints,
        deck,
        favorites,
        team,
        showNotification,
    } = useGame();

    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(pokemon.customName || pokemon.name);

    const isCardInDeck = deck.some(card => card.id === pokemon.id);
    const isCardInFavorites = favorites.some(card => card.id === pokemon.id);
    const isCardInTeam = team.some(card => card.id === pokemon.id);

    const handleRenameClick = () => {
        setIsRenaming(true);
        setNewName(pokemon.customName || pokemon.name);
    };

    const handleSaveRename = () => {
        if (newName.trim() === '') {
            showNotification('El nombre no puede estar vacío.', 'error');
            return;
        }
        if (newName === (pokemon.customName || pokemon.name)) {
            setIsRenaming(false);
            return;
        }

        if (source === 'favorites') {
            renameFavoriteCard(pokemon.id, newName);
        }
        setIsRenaming(false);
    };

    const handleResetNameClick = () => {
        if (source === 'favorites') {
            resetFavoriteCardName(pokemon.id);
        }
        setNewName(pokemon.name);
        setIsRenaming(false);
    };

    const getTypeColorClass = (type) => {
        return styles[`type-${type.toLowerCase()}`];
    };

    return (
        <div className={styles.card} data-source={source}>
            <div className={styles.cardHeader}>
                <span className={styles.pokemonNumber}>#{pokemon.id}</span>
                {isRenaming && source === 'favorites' ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleSaveRename}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSaveRename();
                        }}
                        className={styles.renameInput}
                        autoFocus
                    />
                ) : (
                    <h3 className={styles.pokemonName}>{pokemon.customName || pokemon.name}</h3>
                )}
            </div>

            <img
                src={pokemon.sprites?.front_default || pokemon.image || 'https://via.placeholder.com/140?text=No+Image'}
                alt={pokemon.customName || pokemon.name}
                className={styles.pokemonImage}
            />

            <div className={styles.pokemonDetails}>
                {pokemon.types && pokemon.types.length > 0 && (
                    <p>
                        Tipo: {' '}
                        <div className={styles.typeContainer}>
                            {pokemon.types.map((typeInfo, index) => (
                                <span
                                    key={index}
                                    className={`${styles.typeBadge} ${getTypeColorClass(typeInfo.type ? typeInfo.type.name : typeInfo)}`}
                                >
                                    {typeInfo.type ? typeInfo.type.name : typeInfo}
                                </span>
                            ))}
                        </div>
                    </p>
                )}

                {pokemon.stats && pokemon.stats.length > 0 && (
                    <div className={styles.stats}>
                        {pokemon.stats.map((stat, index) => (
                            <p key={index}>
                                {stat.stat ? stat.stat.name.replace('-', ' ') : stat.name}: {stat.base_stat !== undefined ? stat.base_stat : stat.value}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                {source === 'deck' && (
                    <>
                        {!isCardInDeck ? (
                            <button className={styles.addToDeck} onClick={() => addCardToDeck(pokemon)}>Agregar al Mazo</button>
                        ) : (
                            <button className={styles.removeFromDeck} onClick={() => removeCardFromDeck(pokemon.id)}>Quitar del Mazo</button>
                        )}
                        {!isCardInFavorites ? (
                            <button className={styles.addToFavorites} onClick={() => addCardToFavorites(pokemon)}>Agregar a Favoritos</button>
                        ) : (
                            <button className={styles.removeFromFavorites} onClick={() => removeCardFromFavorites(pokemon.id)}>Quitar de Favoritos</button>
                        )}
                        <button className={styles.deleteForPoints} onClick={() => removeCardForPoints(pokemon.id, 'deck')}>Eliminar por 2 Puntos</button>
                    </>
                )}

                {source === 'booster' && (
                    <>
                        <button className={styles.addToDeck} onClick={() => addCardToDeck(pokemon)}>Agregar al Mazo</button>
                        {!isCardInFavorites && (
                            <button className={styles.addToFavorites} onClick={() => addCardToFavorites(pokemon)}>Agregar a Favoritos</button>
                        )}
                    </>
                )}

                {source === 'favorites' && (
                    <>
                        {!isRenaming ? (
                            <button className={styles.rename} onClick={handleRenameClick}>Renombrar</button>
                        ) : (
                            <button className={styles.saveRename} onClick={handleSaveRename}>Guardar</button>
                        )}
                        {pokemon.customName && (
                            <button className={styles.resetName} onClick={handleResetNameClick}>Reiniciar Nombre</button>
                        )}

                        <button className={styles.removeFromFavorites} onClick={() => removeCardFromFavorites(pokemon.id)}>Quitar de Favoritos</button>
                    </>
                )}

                {source === 'team' && (
                    <>
                        {!isCardInTeam ? (
                            <button className={styles.addToTeam} onClick={() => addCardToTeam(pokemon)}>Agregar al Equipo</button>
                        ) : (
                            <button className={styles.removeFromTeam} onClick={() => removeCardFromTeam(pokemon.id)}>Quitar del Equipo</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;