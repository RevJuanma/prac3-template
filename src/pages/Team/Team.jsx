import React from 'react';
import { useGame } from '../../contexts/GameContext';
import Card from '../../components/Card/Card';
import Notification from '../../components/Notification/Notification';
import styles from './Team.module.css';

const TeamPage = () => {
    const { team } = useGame();

    return (
        <div className={styles.teamPage}>
            <h2>Tu Equipo Pokémon ({team.length}/6)</h2>
            <Notification />
            {team.length === 0 ? (
                <p>Tu equipo está vacío. ¡Agrega Pokémon desde tu mazo o favoritos!</p>
            ) : (
                <div className={styles.cardGrid}>
                    {team.map((pokemon) => (
                        <Card key={pokemon.id} pokemon={pokemon} source="team" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamPage;