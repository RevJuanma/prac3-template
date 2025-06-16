import React from 'react';
import CartaPokemon from '../../components/Carta/pokeCard';
import { useOutletContext } from 'react-router'; // Importa useOutletContext

function FavoritesScreen() {
    // Obtiene los estados y la función de acción del contexto del Outlet (Layout.jsx)
    const { favoritos, cartas, equipo, accionCarta } = useOutletContext();

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">¡Mis Favoritos!</h1>
            <p className="favorites-subtitle">Tus cartas favoritas ({favoritos.length}/10).</p>
            <div className="card-list-container">
                {favoritos.length === 0 ? (
                    <p className="empty-favorites-message">Aún no tienes cartas favoritas. ¡Añade algunas desde el Mazo!</p>
                ) : (
                    favoritos.map(pokemon => (
                        <CartaPokemon
                            key={pokemon.id}
                            pkmn={pokemon}
                            onAction={accionCarta} // Usa la acción global
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
