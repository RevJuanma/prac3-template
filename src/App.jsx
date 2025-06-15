import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BoosterSelector from "./components/BoosterSelector/BoosterSelector";
import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./components/Favorites/Favorites";
import { DeckProvider } from "./context/DeckContext";
import Deck from "./components/Deck/Deck";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TeamProvider } from "./context/TeamContext";
import { PointsProvider } from "./context/PointsContext";
import { PointsDisplay } from "./components/PointsDisplay/PointsDisplay"
import MyTeam from "./components/MyTeam/MyTeam";

export default function App() {
  return (
    <React.Fragment>
      {/* ToastContainer debe estar en el root, sin envolver children */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <PointsProvider>
        <PointsDisplay/>
        <FavoritesProvider>
          <TeamProvider>
            <DeckProvider>
              <BrowserRouter>
                <nav>
                  <NavLink to="/" end>
                    Inicio
                  </NavLink>{" "}
                  | <NavLink to="/abrir-sobre">Abrir Sobre</NavLink> |
                  <NavLink to="/mi-equipo">Mi Equipo</NavLink> |
                  <NavLink to="/favoritos">Favoritos</NavLink>
                </nav>
                <Routes>
                  <Route path="/" element={<Deck />} />
                  <Route path="/abrir-sobre" element={<BoosterSelector />} />
                  <Route path="/mi-equipo" element={<MyTeam />} />
                  <Route path="/favoritos" element={<Favorites />} />
                </Routes>
              </BrowserRouter>
            </DeckProvider>
          </TeamProvider>
        </FavoritesProvider>
      </PointsProvider>
    </React.Fragment>
  );
}
