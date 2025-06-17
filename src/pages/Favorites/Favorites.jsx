import React from 'react';
import CartaPokemon from '../../components/Carta/pokeCard';
import { useOutletContext } from 'react-router';

function FavoritesScreen() {
    const { favoritos, cartas, equipo, accionCarta } = useOutletContext();

    return (
        <div>
            <h1>¡Mis Favoritos!</h1>
            <p>Tus cartas favoritas ({favoritos.length}/10).</p>
            <div className="cartas">
                {favoritos.length === 0 ? (
                    <p>Aún no tienes cartas favoritas.</p>
                ) : (
                    favoritos.map(pokemon => (
                        <CartaPokemon
                            key={pokemon.id}
                            pkmn={pokemon}
                            onAction={accionCarta} 
                            deck={cartas} 
                            favoritos={favoritos} 
                            team={equipo} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default FavoritesScreen;
