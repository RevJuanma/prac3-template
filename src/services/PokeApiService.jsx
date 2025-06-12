export async function fetchPokemon(id) {
  if (!id) throw new Error("Se requiere un ID de Pokémon");
  if (typeof id !== "number") throw new Error("El ID debe ser un número");
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Pokémon no encontrado");
    throw new Error(`Error cargando el Pokémon: ${res.statusText}`);
  }
  return res.json();
}
