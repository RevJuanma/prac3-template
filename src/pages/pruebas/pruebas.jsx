import React, { useState } from 'react';
import { usePokemon } from '../../hooks/usePokemonAPI';

const PokemonViewer = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [search, setSearch] = useState('');
  const { data, loading, error } = usePokemon(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(pokemonName.trim());
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '1rem' }}>
      <h1>Buscar Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{data.name.toUpperCase()}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
          <p>Altura: {data.height}</p>
          <p>Peso: {data.weight}</p>
          <p>Tipo(s): {data.types.map(t => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonViewer;
