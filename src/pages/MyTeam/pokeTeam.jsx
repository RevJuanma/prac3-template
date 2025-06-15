import React, { useState } from 'react'
import { useEffect } from 'react';
import CartaPokemon from '../../components/Carta/pokeCard';
import { obtenerPkmnData } from '../../utils/pokeData';

function TeamScreen() {
    const [pokeList, setPokeList] = useState([])
    const [favoritos, setFavoritos] = useState([]); 
    const [team, setTeam] = useState([]);

    useEffect(() => {      
      const loadTeamPokemons = async () => {
          try {
              // Lista de IDs de Pokémon para el equipo (ejemplo: 6 Pokémon)
              // obtenerListaIdsPokemon ha sido eliminado, así que definimos los IDs directamente.
              const idsToLoad = [6, 12, 25, 52, 133, 143]; 
              const fetchedCards = await Promise.all(idsToLoad.map(id => obtenerPkmnData(id))); // Usa tu utilidad para obtener detalles
              
              setPokeList(fetchedCards.filter(card => card !== null));
              // Para la demostración, el 'team' global es igual a 'pokeList' que se carga aquí.
              // En una app real, 'team' podría venir de un estado global o Firestore.
              setTeam(fetchedCards.filter(card => card !== null)); 

              setLoading(false);
          } catch (error) {
          }
      };
      loadTeamPokemons();
  }, []);

  const accionCarta = (action, data) => {
      switch (action) {
          case 'borrarTeam': 
              setPokeList(prevList => prevList.filter(p => p.id !== data));
              setTeam(prevTeam => prevTeam.filter(p => p.id !== data)); 
              console.log(`Pokémon ID ${data} quitado del equipo.`);
              break;
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 font-inter text-gray-900 antialiased p-4 sm:p-6">
        <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-8">Mi Equipo Pokémon</h1>
        <p className="text-xl text-center text-gray-700 mb-6">Aquí verás tu equipo de 6 Pokémon.</p>
        <div className="flex flex-wrap justify-center gap-6 p-4">
        {pokeList.map((pokemon) => (
            <CartaPokemon 
                key={pokemon.id} 
                pkmn={pokemon} // Pasa el objeto Pokémon completo
                onAction={accionCarta}
                deck={[]} // Por ahora, el mazo no se gestiona aquí directamente
                favoritos={favoritos} // Pasa el estado de favoritos (aunque esté vacío por ahora)
                team={team} // Pasa el estado del equipo, para que el botón "Quitar de Equipo" funcione
            />
        ))}
        </div>
    </div>
  );

}

export default TeamScreen;