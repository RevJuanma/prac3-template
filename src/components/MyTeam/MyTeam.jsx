import React from "react";
import { useTeam } from "../../context/TeamContext";
import PokemonCard from "../Card/Card";
import { FaTrashAlt } from "react-icons/fa";

export default function MyTeam() {
  const { team, toggleTeam } = useTeam();

  if (team.length === 0) {
    return <p>No hay Pokémon en tu equipo</p>;
  }

  return (
    <div>
      <h1>Mi Equipo Pokémon</h1>
      <div className="pokemon-row">
        {team.map((id) => {
          const teamAction = {
            key: `team-action-${id}`,
            label: "Quitar del Equipo",
            icon: <FaTrashAlt />,
            onClick: () => toggleTeam(id),
          };

          return <PokemonCard key={id} id={id} actions={[teamAction]} />;
        })}
      </div>
    </div>
  );
}