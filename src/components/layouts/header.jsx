import {React, useState, useEffect} from "react";
import { Outlet, Link, useOutletContext } from "react-router";
import pokeTitle from "../../assets/pokeTitle.svg";
import "../../App.css";

const pkmnHeader = () => {
    const [puntos, setPuntos] = useState(() => 
    {
      const saved = localStorage.getItem('puntos');
      return saved ? JSON.parse(saved) : 100;
    }
    );
    const [cartas, setCartas] = useState(() => 
    {
      const saved = localStorage.getItem('cartas');
      return saved ? JSON.parse(saved) : [];
    }
    );
    const [favoritos, setFavoritos] = useState(() => 
    {
      const saved = localStorage.getItem('favoritos');
      return saved ? JSON.parse(saved) : [];
    }
    );
    const [equipo, setEquipo] = useState(() => 
    {
      const saved = localStorage.getItem('equipo');
      return saved ? JSON.parse(saved) : [];
    }
    );
    useEffect(() => {
      localStorage.setItem('puntos', JSON.stringify(puntos));
    }, [puntos]);
    useEffect(() => {
      localStorage.setItem('cartas', JSON.stringify(cartas));
    }, [cartas]);
    useEffect(() => {
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }, [favoritos]);
    useEffect(() => {
      localStorage.setItem('equipo', JSON.stringify(equipo));
    }, [equipo]);

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
          setEquipo(Team => {
            if (Team.length < 6)  {
              return [...Team,data]
            }else{
                console.log("¡Limite Alcanzado!")
            }
            return Team
          });
          break;
        case 'borrarTeam':
          setEquipo(Team => {
            const changesTeam = Team.filter(T => T.id !== data)
            return changesTeam
          });
          break;
        case 'borrar':
          setCartas(Cartas => {
            const changesCartas = Cartas.find(c => c.id === data);
            if (changesCartas) {
                setPuntos(points => points + 2);
                setEquipo(equipo => equipo.filter(t => t.id !== data))
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
                if (puntosDescarte > 0){
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
                setEquipo(Team => Team.map(equipo =>
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
                setEquipo(Team => Team.map(equipo =>
                    equipo.id === data ? {...equipo, nombrePropio: null} : equipo
                ));
                break;
      }
    };

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
      <Outlet context={{puntos, setPuntos, cartas, setCartas, favoritos, setFavoritos, equipo, setEquipo, accionCarta}}/>
    </main>
    </>
  );
};

export default pkmnHeader;