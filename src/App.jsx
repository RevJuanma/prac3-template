import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import HomePage from './pages/Home/Home';
import BoosterPage from './pages/Booster/Booster';
import FavoritesPage from './pages/Favorites/Favorites';
import TeamPage from './pages/Team/Team';
import Header from './components/Header/Header';
import './styles/global.css';

function App() {
    return (
        <Router>
            <GameProvider>
                <Header /> {/**/}
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/booster" element={<BoosterPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/team" element={<TeamPage />} />
                    </Routes>
                </main>
            </GameProvider>
        </Router>
    );
}

export default App;
