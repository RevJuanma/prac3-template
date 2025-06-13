import React from "react";
import { useDeck } from "../../context/DeckContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useTeam } from "../../context/TeamContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function Deck() {
  const { toggleDeck, deck } = useDeck();
  const { toggleTeam, isInTeam, isFilledTeams } = useTeam();
  const { isFavorite } = useFavorites();

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
                alert("Este Pokémon está en favoritos y no puede quitarse del mazo");
              } else if (isInTeam(id)) {
                alert("Este Pokémon está en tu equipo y no puede quitarse del mazo");
              } else {
                toggleDeck(id);
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
                alert("Tu equipo alcanzó el límite máximo");
              } else {
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
