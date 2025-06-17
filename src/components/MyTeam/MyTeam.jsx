import React from "react";
import { useTeam } from "../../context/TeamContext";
import PokemonCard from "../Card/Card";
import { FaTrashAlt } from "react-icons/fa";

// 1. Definición del componente y obtención del contexto de equipo
export default function MyTeam() {
  const { team, toggleTeam } = useTeam(); // array de IDs y función para alternar

  // 2. Early return: mostrar mensaje si no hay Pokémon en el equipo
  if (team.length === 0) {
    return <p>No hay Pokémon en tu equipo</p>;
  }

  // 3. Render principal: título y lista de cartas con acción para quitar
  return (
    <div>
      <h1>Mi Equipo Pokémon</h1>
      <div className="pokemon-row">
        {team.map((id) => {
          // 4. Definición de la acción de quitar del equipo
          const teamAction = {
            key: `team-action-${id}`,
            label: "Quitar del Equipo",
            icon: <FaTrashAlt />, // icono de basura para indicar eliminación
            onClick: () => toggleTeam(id), // alterna presencia en el equipo
          };

          // 5. Render de la tarjeta de Pokémon con la acción definida
          return <PokemonCard key={id} id={id} actions={[teamAction]} />;
        })}
      </div>
    </div>
  );
}
