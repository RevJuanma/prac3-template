// 1. Definición de la función asíncrona para obtener datos de un Pokémon por ID
export async function fetchPokemon(id) {
  // 2. Validaciones iniciales del parámetro ID
  if (!id) throw new Error("Se requiere un ID de Pokémon"); // 2.1 ID obligatorio
  if (typeof id !== "number") throw new Error("El ID debe ser un número"); // 2.2 ID debe ser numérico

  // 3. Realizar petición a la API de PokéAPI
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // 4. Verificar que la respuesta sea exitosa
  if (!res.ok) {
    if (res.status === 404) throw new Error("Pokémon no encontrado"); // 4.1 Manejar not found
    throw new Error(`Error cargando el Pokémon: ${res.statusText}`); // 4.2 Otros errores HTTP
  }

  // 5. Devolver el cuerpo parseado como JSON
  return res.json();
}
