import React from "react";
import { Link } from "react-router-dom";
import { usePoints } from "../src/index.jsx";
import "../src/App.css";

function Header() {
  const { points } = usePoints();

  return (
    <header className="app-header">
      <div className="header-left">
        <img
          src="../src/assets/Logo-Pokemon.png"
          alt="Pokémon logo"
          className="logo-pokemon"
        />
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/mis-cartas">Mis Cartas</Link></li>
            <li><Link to="/mi-equipo">Mi Equipo</Link></li>
            <li><Link to="/mis-favoritos">Mis Favoritos</Link></li>
            <li><Link to="/abrir-sobres">Abrir Sobres</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
