import React from "react";
import { useDeck, MAX_DECK_SIZE } from "../../context/DeckContext";
import { useTeam, MAX_TEAM_SIZE } from "../../context/TeamContext";
import { useFavorites, MAX_FAVS_SIZE } from "../../context/FavoritesContext";

export default function CountPokemonDisplay() {
  const { deck } = useDeck();
  const { team } = useTeam();
  const { favs } = useFavorites();

  return (
    <div className="flex justify-around my-4 text-lg font-semibold">
      <div>Mazo: {deck.length}/{MAX_DECK_SIZE}</div>
      <div>Equipo: {team.length}/{MAX_TEAM_SIZE}</div>
      <div>Favoritos: {favs.length}/{MAX_FAVS_SIZE}</div>
    </div>
  );
}
