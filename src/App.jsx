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
import { PointsDisplay } from "./components/PointsDisplay/PointsDisplay";
import MyTeam from "./components/MyTeam/MyTeam";
import CountPokemonDisplay from "./components/CountPokemonDisplay/CountPokemonDisplay";

// 1. Componente raíz de la aplicación
export default function App() {
  return (
    <React.Fragment>
      {/* 2. Contenedor de notificaciones globales, debe estar en el root */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />

      {/* 3. Proveedores de contexto para puntos y visualización */}
      <PointsProvider>
        <PointsDisplay />

        {/* 4. Contexto para favoritos -> Team -> Deck, asegura orden correcto */}
        <FavoritesProvider>
          <TeamProvider>
            <DeckProvider>
              {/* 5. Muestra conteos de items en mazo, equipo y favoritos */}
              <CountPokemonDisplay />

              {/* 6. Configuración de enrutamiento */}
              <BrowserRouter>
                {/* 6.1 Barra de navegación con enlaces a rutas */}
                <nav>
                  <NavLink to="/" end>
                    Inicio
                  </NavLink>{" "}
                  | <NavLink to="/abrir-sobre">Abrir Sobre</NavLink> |
                  <NavLink to="/mi-equipo">Mi Equipo</NavLink> |
                  <NavLink to="/favoritos">Favoritos</NavLink>
                </nav>

                {/* 6.2 Definición de rutas y componentes asociados */}
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
