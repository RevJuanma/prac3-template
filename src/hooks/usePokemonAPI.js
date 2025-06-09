import { useState, useEffect } from 'react';

export const usePokemon = (input) => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!input) return;

    const fetchPokemon = async (param) => {
      const formatted = typeof param === 'string' ? param.toLowerCase() : param;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${formatted}`);
      if (!res.ok) throw new Error(`Error al obtener Pokémon: ${param}`);
      return await res.json();
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let result;

        if (Array.isArray(input)) {
          result = await Promise.all(input.map(fetchPokemon));
        } else {
          result = await fetchPokemon(input);
        }

        setData(result);
      } catch (err) {
        setError(err.message || 'Error al obtener Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [input]);

  return { data, loading, error };
};
