import React from 'react'
import CartaPokemon from '../../components/Carta/pokeCard';
import { useOutletContext } from 'react-router';
import './pokeTeam.css'

function TeamScreen() {
    const { equipo, favoritos, cartas, accionCarta} = useOutletContext();

    return (
        <div>
            <h1>Mi Equipo Pokémon</h1>
            <p>Aquí verás tu equipo de 6 Pokémon.</p>
            <div className='cartas'>
                {equipo.length === 0 ? (
                    <p>Aún no tienes Pokémon en tu equipo.</p>
                ) : (
                    equipo.map((pokemon) => (
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

export default TeamScreen;