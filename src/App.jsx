import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BoosterSelector from "./components/BoosterSelector/BoosterSelector";
import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./components/Favorites/Favorites";
import { DeckProvider } from "./context/DeckContext";
import Deck from "./components/Deck/Deck";

export default function App() {
  return (
    <FavoritesProvider>
      <DeckProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/" end>
              Inicio
            </NavLink>{" "}
            |<NavLink to="/abrir-sobre">Abrir Sobre</NavLink> |
            <NavLink to="/mi-equipo">Mi Equipo</NavLink> |
            <NavLink to="/favoritos">Favoritos</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Deck />} />
            <Route path="/abrir-sobre" element={<BoosterSelector />} />
            <Route path="/mi-equipo" />
            <Route path="/favoritos" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </DeckProvider>
    </FavoritesProvider>
  );
}
