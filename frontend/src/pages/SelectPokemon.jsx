import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import PokemonCard from '../components/PokemonCard';
import CenteredContainer from '../components/CenteredContainer';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';

import { selectPokemonCards } from '../services/cardService';

const SelectPokemon = () => {
  const { state } = useLocation();
  const { sessionId, pokemons } = state?.session || {};
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const maxSelectable = pokemons?.length === 6 ? 2 : 1;

  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');

  if (!pokemons) return <p>No hay pokemons disponibles</p>;

  const handleSelect = (idPokemon) => {
    setError('');
    if (selectedIds.includes(idPokemon)) {
      setSelectedIds(selectedIds.filter((id) => id !== idPokemon));
    } else if (selectedIds.length < maxSelectable) {
      setSelectedIds([...selectedIds, idPokemon]);
    } else {
      setError(`Solo podés seleccionar ${maxSelectable} Pokémon${maxSelectable > 1 ? 's' : ''}.`);
    }
  };

  const handleConfirm = async () => {
    if (selectedIds.length !== maxSelectable) {
      return setError(`Debés seleccionar exactamente ${maxSelectable} Pokémon${maxSelectable > 1 ? 's' : ''}.`);
    }

    try {
      await selectPokemonCards({ sessionId, selectedPokemonIds: selectedIds }, token);
      navigate('/team'); // Redireccionamos al equipo, o a donde corresponda
    } catch (err) {
      const message = err.response?.data?.message || 'Error al seleccionar el Pokémon';
      setError(message);
    }
  };

  return (
    <CenteredContainer maxWidth="1200px">
      <h2 style={{ textAlign: 'center' }}>Seleccioná tu Pokémon</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {pokemons.map((poke, index) => (
          <PokemonCard
            key={index}
            pokemon={poke}
            onSelect={() => handleSelect(poke.idPokemon)}
            selected={selectedIds.includes(poke.idPokemon)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <ErrorMessage message={error} />
        <Button onClick={handleConfirm}>Confirmar selección</Button>
      </div>
    </CenteredContainer>
  );
};

export default SelectPokemon;
