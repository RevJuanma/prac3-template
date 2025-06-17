import React from "react";
import CartaPokemon from "../../components/Carta/pokeCard";
import { useOutletContext } from "react-router";
import './Home.css'


function HomeScreen() {
    const {
        puntos, setPuntos, cartas, setCartas, favoritos, setFavoritos, equipo, setEquipo, accionCarta
    } = useOutletContext();

    return (
        <div>
            <h1>Mi Mazo</h1>
            <p>
                Puntos: <span>{puntos}</span> | 
                Favoritos: <span>{favoritos.length}/10</span> |
                Equipo: <span>{equipo.length}/6</span> |
                Mazo: <span>{cartas.length}/50</span>
            </p>
            <div className="cartas">
                {cartas.length === 0 ? (
                    <p>Tu mazo está vacío.</p>
                ) : (
                    cartas.map(pokemonData => (
                        <CartaPokemon
                            key={pokemonData.id}
                            pkmn={pokemonData} 
                            onAction={accionCarta}
                            favoritos={favoritos} 
                            team={equipo} 
                            deck={cartas}
                            />
                    ))
                )}
            </div>
            <footer>
                <button className="btnRestart" onClick={() => {setPuntos(100);setCartas([]);setFavoritos([]);setEquipo([]);localStorage.clear();}}>
                  Reiniciar progreso
                </button>
            </footer>
        </div>
    );


}


export default HomeScreen;