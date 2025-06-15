import React from "react";
import { useDeck } from "../../context/DeckContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useTeam } from "../../context/TeamContext";
import { useFavorites } from "../../context/FavoritesContext";
import { POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO, POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO, LIMITE_EQUIPO, AÑADIO_EQUIPO, QUITAR_EQUIPO, AÑADIO_PUNTOS } from "../../constans/alerts"
import { toast } from "react-toastify";
import { usePoints } from "../../context/PointsContext";

export default function Deck() {
  const { toggleDeck, deck } = useDeck();
  const { toggleTeam, isInTeam, isFilledTeams } = useTeam();
  const { isFavorite } = useFavorites();
  const { incrementPoints } = usePoints();

  if (deck.length === 0) {
    return <p>No tienes Pokémon en tu mazo</p>;
  }

  return (
    <div>
      <h1>Mazo:</h1>
      <div className="pokemon-row">
        {deck.map((id) => {
          const removeFromDeckAction = {
            key: `remove-from-deck`,
            label: "Quitar del mazo",
            icon: <FaMinus />,
            onClick: () => {
              if (isFavorite(id)) {
                toast.warn (POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO);
              } else if (isInTeam(id)) {
                toast.warn (POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO);
              } else {
                toggleDeck(id);
                toast.info(AÑADIO_PUNTOS)
                incrementPoints(1);
              }
            },
          };

          const inTeam = isInTeam(id);

          const toggleTeamAction = {
            key: `toggle-team`,
            label: inTeam ? "Quitar del equipo" : "Agregar al equipo",
            icon: inTeam ? <FaMinus /> : <FaPlus />,
            onClick: () => {
              if (isFilledTeams() && !isInTeam(id)) {
                toast.warn (LIMITE_EQUIPO);
              } else {
                inTeam ? toast.info(QUITAR_EQUIPO) : toast.success(AÑADIO_EQUIPO);
                toggleTeam(id);
              }
            },
          };

          return <PokemonCard key={id} id={id} actions={[removeFromDeckAction, toggleTeamAction]} />;
        })}
      </div>
    </div>
  );
}
