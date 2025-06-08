import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const usePokemon = (pokemonName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonName.toLowerCase()}`);

        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  return { data, loading, error };
};
