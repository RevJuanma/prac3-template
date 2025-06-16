import Home from "../pages/Home.jsx";
import MisCartas from "../pages/MisCartas.jsx";
import MiEquipo from "../pages/Equipo.jsx";
import MisFavoritos from "../pages/Favoritos.jsx";
import Booster from "../pages/Booster.jsx";
import Header from "../components/Header.jsx";
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";

import { usePoints } from './hooks/usePoints.jsx';

import { GameProvider, useGame } from './contexts/GameContext.jsx';

import "./App.css";
export { Header, Home, MisCartas, MiEquipo, MisFavoritos, Booster, PokeCard, usePoints, GameProvider, useGame };