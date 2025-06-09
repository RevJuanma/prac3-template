export function getRandomPokemonIds(count = 5) {
  const maxId = 1017;
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    ids.add(randomId);
  }

  return Array.from(ids);
}