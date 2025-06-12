import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BoosterSelector from "./components/BoosterSelector/BoosterSelector";
import "./App.css"

export default function App() {
  return (
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
        <Route path="/" />
        <Route path="/abrir-sobre" element={<BoosterSelector />} />
        <Route path="/mi-equipo" />
        <Route path="/favoritos" />
      </Routes>
    </BrowserRouter>
  );
}