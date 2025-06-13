import React from "react";
import { useDeck } from "../../context/DeckContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useTeam } from "../../context/TeamContext";

export default function Deck() {
  const { toggleDeck, deck } = useDeck();
  const { toggleTeam, isInTeam } = useTeam();

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
            onClick: () => toggleDeck(id),
          };

          const inTeam = isInTeam(id);

          const toggleTeamAction = {
            key: `toggle-team`,
            label: inTeam ? "Quitar del equipo" : "Agregar al equipo",
            icon: inTeam ? <FaMinus /> : <FaPlus />,
            onClick: () => toggleTeam(id),
          };

          return <PokemonCard key={id} id={id} actions={[removeFromDeckAction, toggleTeamAction]} />;
        })}
      </div>
    </div>
  );
}
