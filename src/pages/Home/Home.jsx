import React from "react";
import CartaPokemon from "../../components/Carta/pokeCard";
import { useOutletContext } from "react-router";


function HomeScreen() {
    const {
        puntos, cartas, favoritos, equipo, accionCarta
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
            <div>
                {cartas.length === 0 ? (
                    <p>Tu mazo está vacío. ¡Abre sobres para conseguir cartas!</p>
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
        </div>
    );


}


export default HomeScreen;