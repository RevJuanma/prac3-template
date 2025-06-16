import React from "react";
import "../src/App.css";

function PokeCard({
  pokemon,
  showActions = false,
  onAddToFavorites,
  onRemoveFromFavorites,
  onAddToTeam,
  onRemoveFromTeam,
  onDeleteCard,
  isInFavorites = false,
  isInTeam = false,
  context,
}) {
  if (!pokemon) {
    return <div className="poke-card">No hay datos de Pokémon para mostrar.</div>;
  }

  const displayName = pokemon.customName || pokemon.name;

  return (
    <div className="poke-card">
      <div className="card-header">
        <span className="poke-name">{displayName}</span>
        <span className="poke-id">ID: {pokemon.id}</span>
      </div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="poke-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/150x150/cccccc/000000?text=No+Image";
        }}
      />
      {pokemon.specialMove && (
        <div className="special-move">
          <strong>Movimiento:</strong> {pokemon.specialMove}
          {pokemon.moveDesc && <p className="move-desc">{pokemon.moveDesc}</p>}
        </div>
      )}

      <ul className="stats-list">
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            <strong>{stat.name}:</strong> {stat.value}
          </li>
        ))}
      </ul>

      {showActions && (
        <div className="card-actions">
          {isInFavorites ? (
            <button onClick={onRemoveFromFavorites} className="action-button remove-fav">
              Quitar de Favoritos
            </button>
          ) : (
            <button onClick={onAddToFavorites} className="action-button add-fav">
              Agregar a Favoritos
            </button>
          )}

          {context === "team" ? (
            <button onClick={onRemoveFromTeam} className="action-button remove-team">
              Quitar del Equipo
            </button>
          ) : (
            isInTeam ? (
              <button onClick={onRemoveFromTeam} className="action-button remove-team">
                Quitar del Equipo
              </button>
            ) : (
              <button onClick={onAddToTeam} className="action-button add-team">
                Agregar al Equipo
              </button>
            )
          )}

          {(context === "home" || context === "miscartas") && (
            <button onClick={onDeleteCard} className="action-button delete-card">
              Eliminar (por puntos)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PokeCard;
