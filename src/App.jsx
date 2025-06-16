import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import pokeTitle from "./assets/pokeTitle.svg";
import pokeSubTitle from "./assets/pokeSubTitle.svg"
import './App.css';


function App() {


    return (
      <>
        <div>
            <div>
                <img src={pokeTitle} alt="Título Pokémon" className="titulo"/>
            </div>
            <p><img src={pokeSubTitle} alt="subTitulo Pokémon" className="subTitulo"/></p>
            <Link to ="auth/Home" className="btnPlay">
                <h1>JUGAR</h1>
            </Link>
        </div>
      </>
    );
};


export default App;