import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import pokeTitle from "./assets/pokeTitle.svg";
import './App.css';


function App() {
    return (
        <>
        <div className="inicio">
            <div className="titulo">
                <img src={pokeTitle} alt="titulo" />
            </div>
            <Link to ="auth/Home" className="btnPlay">
            <h1>JUGAR</h1>
            </Link>
        </div>
        </>
    );
}



export default App;