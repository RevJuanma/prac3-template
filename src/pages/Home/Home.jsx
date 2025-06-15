import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartaPokemon from "../../components/Carta/pokeCard";
import { obtenerPkmnData } from "../../utils/pokeData";


function HomeScreen() {
    const [cartas, setCartas] = useState([1,2,5,8,9]); 
    const [favoritos, setFavoritos] = useState([]); 
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        const loadInitialCards = async () => {
            try {
                setLoading(true); // Iniciar carga
                const idsIniciales = [1, 2, 5, 8, 9]; // Tus IDs iniciales
                const fetchedCards = await Promise.all(
                    idsIniciales.map(id => obtenerPkmnData(id))
                );
                // Filtra cualquier carta que no se pudo cargar (retornó null)
                setCartas(fetchedCards.filter(card => card !== null));
                setLoading(false); // Finalizar carga
            } catch (err) {
                console.error("Error al cargar las cartas iniciales:", err);
                setError("Error al cargar las cartas iniciales. Por favor, intente de nuevo.");
                setLoading(false); // Finalizar carga incluso con error
            }
        };
        loadInitialCards();
    }, []); // Array de dependencias vacío para ejecutar solo una vez al montar


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
                <p className="text-2xl font-bold text-indigo-700">Cargando cartas...</p>
            </div>
        );
    }



    const accionCarta = (action, data) => {
      switch (action) {
        case 'añadirFavoritos':
          setFavoritos(Favs => {
            if (Favs.length < 10)  {
              return [...Favs,data]
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
          setCartas(Card => {
            const changesCard = Card.filter(C => C.id !== data)
            return changesCard
          });
          break;
      }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 font-inter text-gray-900 antialiased p-4 sm:p-6">
            <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-8">Mi Mazo de Prueba</h1>
            <p className="text-xl text-center text-gray-700 mb-6">
                Favoritos: <span className="font-bold text-purple-600">{favoritos.length}/10</span> |
                Equipo: <span className="font-bold text-indigo-600">{team.length}/6</span>
            </p>
            <div className="flex flex-wrap justify-center gap-6 p-4">
                {cartas.map(pokemonData => (
                    <CartaPokemon
                        key={pokemonData.id}
                        pkmn={pokemonData}
                        onAction={accionCarta}
                        favoritos={favoritos} 
                        team={team} 
                    />
                ))}
            </div>
        </div>
    );


}


export default HomeScreen;