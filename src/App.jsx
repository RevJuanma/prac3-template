import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import pokeTitle from "./assets/pokeTitle.svg";
import './App.css';


function App() {
    const [puntos, setPuntos] = useState(100); // Se inicia con 100 puntos
    const [cartas, setCartas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [team, setTeam] = useState([]);

    const accionCarta = (action, data) => {
      switch (action) {
        case 'añadirFavoritos':
          setFavoritos(Favs => {
            if (Favs.length < 10)  {
              return [...Favs,{...data, nombrePropio: data.nombrePropio || null}]
            }else{
                console.log("¡Limite Alcanzado!")
            }
            return Favs
          });
          break;
        case 'borrarFavoritos':
          setFavoritos(Favs => {
            const changesFavs = Favs.filter(F => F.id !== data)
            return changesFavs
          });
          break;
        case 'añadirTeam':
          setTeam(Team => {
            if (Team.length < 6)  {
              return [...Team,data]
            }else{
                console.log("¡Limite Alcanzado!")
            }
            return Team
          });
          break;
        case 'borrarTeam':
          setTeam(Team => {
            const changesTeam = Team.filter(T => T.id !== data)
            return changesTeam
          });
          break;
        case 'borrar':
          setCartas(Cartas => {
            const changesCartas = Cartas.find(c => c.id === data);
            if (changesCartas) {
                setPuntos(points => points + 2);
                setTeam(equipo => equipo.filter(t => t.id !== data))
                return Cartas.filter(C => C.id !== data)
            } 
            return Cartas
          });
          break;
        case "gastarPuntos":
            setPuntos(points => points - data);
            break;
        case "añadirNuevaCarta":
            setCartas(Carta => {
                let mazoCartas = [...Carta];
                let puntosDescarte = 0;
                data.forEach( NuevaCarta => {
                    if (mazoCartas.length < 50) {
                        mazoCartas.push(NuevaCarta);
                    } else {
                        puntosDescarte += 2;
                    }
                });
                if (puntosDescartar > 0){
                    setPuntos(points => points + puntosDescarte);
                }
                return mazoCartas;
            });
            break;
            case "cambiarNombrePersonalizado":
                setFavoritos(Favs => Favs.map(fav =>
                    fav.id === data.id ? {...fav, nombrePropio: data.nuevoNombre || null} : fav
                ));
                setCartas(Carta => Carta.map(card =>
                    card.id === data.id ? {...card, nombrePropio: data.nuevoNombre|| null} : card
                ));
                setTeam(Team => Team.map(equipo =>
                    equipo.id === data.id ? {...equipo, nombrePropio: data.nuevoNombre || null} : equipo
                ));
                break;
            case "quitarNombrePersonalizado":
                setFavoritos(Favs => Favs.map(fav =>
                    fav.id === data ? {...fav, nombrePropio: null} : fav
                ));
                setCartas(Carta => Carta.map(card =>
                    card.id === data ? {...card, nombrePropio: null} : card
                ));
                setTeam(Team => Team.map(equipo =>
                    equipo.id === data ? {...equipo, nombrePropio: null} : equipo
                ));
                break;
      }
    };


    if (window.location.pathname === '/' || window.location.pathname === '/auth/') {
        return (
            <div className="main-container">
                <div className="app-title-wrapper">
                    <img src={pokeTitle} alt="Título Pokémon" className="app-title-image" />
                </div>
                <Link to ="auth/Home" className="play-button">
                    <h1>JUGAR</h1>
                </Link>
            </div>
        );
    }



    return (
        <Outlet context={{puntos, setPuntos, cartas, setCartas, favoritos, setFavoritos, team, setTeam, accionCarta}}/>
    );
};


export default App;