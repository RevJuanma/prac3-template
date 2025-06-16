import React from "react";
import { useGame } from "../src/contexts/GameContext.jsx";
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";
import "../src/App.css";

function MiEquipo() {
  const { team, removeCardFromTeam, isCardInFavorites, addCardToFavorites, removeCardFromFavorites, isCardInTeam } = useGame();

  return (
    <div className="page-content">
      <h2>Mi Equipo Pokémon ({team.length}/6)</h2>
      <p>Aquí podrás ver y gestionar tu equipo de Pokémon. Las cartas pueden ser del mazo o de favoritos.</p>

      {team.length === 0 ? (
        <p>Aún no tienes Pokémon en tu equipo. ¡Puedes agregarlos desde la sección "Inicio" o "Mis Cartas"!</p>
      ) : (
        <div className="card-list-container">
          {team.map((card) => (
            <PokeCard
              key={card.id}
              pokemon={card}
              showActions={true}
              onRemoveFromTeam={() => removeCardFromTeam(card.id)}
              isInFavorites={isCardInFavorites(card.id)}
              onAddToFavorites={() => addCardToFavorites(card)}
              onRemoveFromFavorites={() => removeCardFromFavorites(card.id)}
              isInTeam={isCardInTeam(card.id)}
              context="team"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MiEquipo;
