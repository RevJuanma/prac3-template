import React from "react";
import { useDeck, MAX_DECK_SIZE } from "../../context/DeckContext";
import { useTeam, MAX_TEAM_SIZE } from "../../context/TeamContext";
import { useFavorites, MAX_FAVS_SIZE } from "../../context/FavoritesContext";

// 1. Definición del componente sin props externas
export default function CountPokemonDisplay() {
  // 2. Obtención de datos globales: mazo, equipo y favoritos
  const { deck } = useDeck();
  const { team } = useTeam();
  const { favs } = useFavorites();

  // 3. Renderizado principal: muestra conteos con límites predefinidos
  return (
    <div className="flex justify-around my-4 text-lg font-semibold">
      {/* 3.1 Mostrar longitud actual y máximo permitido del mazo */}
      <div>
        Mazo: {deck.length}/{MAX_DECK_SIZE}
      </div>

      {/* 3.2 Mostrar longitud actual y máximo permitido del equipo */}
      <div>
        Equipo: {team.length}/{MAX_TEAM_SIZE}
      </div>

      {/* 3.3 Mostrar longitud actual y máximo permitido de favoritos */}
      <div>
        Favoritos: {favs.length}/{MAX_FAVS_SIZE}
      </div>
    </div>
  );
}
