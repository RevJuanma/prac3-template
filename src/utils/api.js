const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonData = async (pokemonIdOrName) => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}${pokemonIdOrName}`);
    if (!response.ok) {
      throw new Error(`Error fetching Pokémon: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Pokémon data:', error);
    throw error;
  }
};

export const fetchRandomPokemons = async (count) => {
  const pokemons = [];
  const fetchedIds = new Set();

  while (pokemons.length < count) {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    if (!fetchedIds.has(randomId)) {
      try {
        const pokemon = await fetchPokemonData(randomId);
        pokemons.push(pokemon);
        fetchedIds.add(randomId);
      } catch (error) {
      }
    }
  }
  return pokemons;
};