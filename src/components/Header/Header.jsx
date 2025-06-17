import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import styles from './Header.module.css';

const Header = () => {
    const { points, deck } = useGame();

    return (
        <header className={styles.header}>
            <nav>
                <Link to="/" className={styles.navLink}>Home (Mazo)</Link>
                <Link to="/booster" className={styles.navLink}>Abrir Sobres</Link>
                <Link to="/favorites" className={styles.navLink}>Favoritos</Link>
                <Link to="/team" className={styles.navLink}>Equipo</Link>
            </nav>
            <div className={styles.info}>
                <span>Puntos: {points}</span>
                <span>Mazo: {deck.length}/50</span>
            </div>
        </header>
    );
};

export default Header;