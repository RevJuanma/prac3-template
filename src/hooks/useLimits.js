import useMyPokemons from "./useMyPokemons";
import useMyFavorites from "./useMyfavorites";
import usePoints from "./usePoints";

export function useHasReachedCollectionLimit(limit = 50) {
  const { collection } = useMyPokemons();
  return collection.length >= limit;
}

export function useHasReachedFavoritesLimit(limit = 10) {
  const { favorites } = useMyFavorites();
  return favorites.length >= limit;
}

export function useHasReachedPointsLimit(limit = 0) {
  const { points } = usePoints();
  return points > limit;
}
