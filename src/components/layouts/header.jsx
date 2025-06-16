import React from "react";
import { Outlet, Link, useOutletContext } from "react-router";
import pokeTitle from "../../assets/pokeTitle.svg";
import "../../App.css";

const pkmnHeader = () => {
  const {puntos} = useOutletContext();

  return (
    <>
        <header className="pkmnHead">
            <div className="pkmnTitle">
                <Link to ="/">
                <img src={pokeTitle} alt="pokeTitle" />
                </Link>
            </div>
              <Link to="Home" style={{color:"black",fontWeight:"500",textDecoration:"none"}}>Inicio</Link>
              <Link to="Team" style={{color:"black",fontWeight:"500",textDecoration:"none"}}>Equipo</Link>
              <Link to="Favorites" style={{color:"black",fontWeight:"500",textDecoration:"none"}}>Favoritos</Link>
              <Link to="Sobres" style={{color:"black",fontWeight:"500",textDecoration:"none"}}>Abrir Sobres</Link>
            <label className="pkmnPoints">Puntos: {puntos}</label>
        </header>
    <main style={{marginTop:"100px"}}>
      <Outlet context={useOutletContext()}/>
    </main>
    </>
  );
};

export default pkmnHeader;