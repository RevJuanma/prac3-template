const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}${id}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(typeInfo => typeInfo.type.name),
            stats: data.stats.map(statInfo => ({
                name: statInfo.stat.name,
                value: statInfo.base_stat,
            })),
            originalName: data.name, 
        };
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        throw error; 
    }
};


export const getRandomPokemonIds = (count) => {
    const ids = new Set();
    while (ids.size < count) {
        ids.add(Math.floor(Math.random() * 1025) + 1);
    }
    return Array.from(ids);
};