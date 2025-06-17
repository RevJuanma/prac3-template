import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Booster from './pages/Booster';
import Favorites from './pages/Favorites';
import { useGameStore } from './utils/store';
import { fetchPokemonData } from './utils/api';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { deck, favoriteCards, team, points, notifications, clearNotification } = useGameStore();

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications, clearNotification]);

  return (
    <div className="app-container">
      <nav className="navbar">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('booster')}>Booster</button>
        <button onClick={() => setCurrentPage('favorites')}>Favorites</button>
        <div className="navbar-info">
          <span>Points: {points}</span>
          <span>Deck: {deck.length}/50</span>
          <span>Favorites: {favoriteCards.length}/10</span>
          <span>Team: {team.length}/6</span>
        </div>
      </nav>

      <div className="notifications-container">
        {notifications.map((notif, index) => (
          <div key={index} className={`notification ${notif.type === 'error' ? 'error-notification' : ''}`}>
            {notif.message}
          </div>
        ))}
      </div>

      {currentPage === 'home' && <Home />}
      {currentPage === 'booster' && <Booster />}
      {currentPage === 'favorites' && <Favorites />}
    </div>
  );
}

export default App;