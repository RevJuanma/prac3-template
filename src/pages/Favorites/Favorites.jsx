import React from 'react';
import CartaPokemon from '../../components/Carta/pokeCard';
import { useOutletContext } from 'react-router';

function FavoritesScreen() {
    const { favoritos, cartas, equipo, accionCarta } = useOutletContext();

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">¡Mis Favoritos!</h1>
            <p className="favorites-subtitle">Tus cartas favoritas ({favoritos.length}/10).</p>
            <div className="card-list-container">
                {favoritos.length === 0 ? (
                    <p className="empty-favorites-message">Aún no tienes cartas favoritas.</p>
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
