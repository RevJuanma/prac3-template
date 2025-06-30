import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CenteredContainer from '../components/CenteredContainer';
import PokemonCard from '../components/PokemonCard';
import PopupMessage from '../components/PopupMessage';
import Button from '../components/Button';

import { getTeam, addToTeam  } from '../services/teamPokemonService';

const Team = () => {
  const token = useSelector((state) => state.auth.token);
  const [team, setTeam] = useState({ pokemon: [], slotUsed: 0 });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (!token) return;

    const fetchTeam = async () => {
      setLoading(true);
      try {
        const data = await getTeam(token);
        setTeam(data);
      } catch (err) {
        console.error('Error al cargar el equipo', err);
        setPopup({ message: 'Error al cargar el equipo', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [token]);

  const handleToggleTeam = async (pokemonId) => {
    try {
      const response = await addToTeam(pokemonId, token);
      setPopup({ message: response.message || 'Operación realizada con éxito', type: 'success' });
      const updatedTeam = await getTeam(token);
      setTeam(updatedTeam);
    } catch (err) {
      console.error('Error al actualizar el equipo', err);
      setPopup({ message: 'Error al actualizar el equipo', type: 'error' });
    }
  };

  return (
    <CenteredContainer maxWidth="1200px">
      <h2 style={{ textAlign: 'center' }}>Equipo Pokémon</h2>
      <p style={{ textAlign: 'center' }}>
        Pokémon en el equipo: {team.slotUsed}/6
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando equipo...</p>
      ) : team.pokemon.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No tienes Pokémon en el equipo aún.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {team.pokemon.map((poke) => (
            <PokemonCard
              key={poke.id}
              pokemon={poke}
              onSelect={null}
              selected={false}
              actions={
                <>
                  <Button onClick={() => handleToggleTeam(poke.id)}>
                    Quitar del Equipo
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}

      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: '', type: 'success' })}
      />
    </CenteredContainer>
  );
};

export default Team;
