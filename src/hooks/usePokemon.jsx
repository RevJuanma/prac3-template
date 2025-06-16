import { useState, useEffect } from 'react';

const usePokemon = (id) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setPokemonData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPokemonData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching Pokémon data:", err);
                setError(err);
                setLoading(false);
            });
    }, [id]);

    return { pokemonData, loading, error };
};

export default usePokemon;