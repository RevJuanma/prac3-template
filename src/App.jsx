import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import pokeTitle from "./assets/pokeTitle.svg";
import './App.css';


function App() {


    return (
      <>
        <div className="main-container">
            <div className="app-title-wrapper">
                <img src={pokeTitle} alt="Título Pokémon" className="app-title-image" />
            </div>
            <Link to ="auth/Home" className="play-button">
                <h1>JUGAR</h1>
            </Link>
        </div>
      </>
    );
};


export default App;