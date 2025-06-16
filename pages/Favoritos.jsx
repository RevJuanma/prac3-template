import React, { useState } from "react";
import { useGame } from "../src/contexts/GameContext.jsx";
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";
import "../src/App.css";

function MisFavoritos() {
  const {favorites,removeCardFromFavorites,renameFavoriteCard,resetFavoriteCardName,isCardInTeam,addCardToTeam,removeCardFromTeam,} = useGame();

  const [editingCardId, setEditingCardId] = useState(null);
  const [newCustomName, setNewCustomName] = useState("");

  const handleEditClick = (card) => {
    setEditingCardId(card.id);
    setNewCustomName(card.customName || card.name);
  };

  const handleSaveName = (cardId) => {
    renameFavoriteCard(cardId, newCustomName);
    setEditingCardId(null);
    setNewCustomName("");
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
    setNewCustomName("");
  };

  return (
    <div className="page-content">
      <h2>Mis Pokémon Favoritos ({favorites.length}/10)</h2>
      <p>Guarda tus Pokémon más queridos aquí para un acceso rápido.</p>

      {favorites.length === 0 ? (
        <p>Aún no tienes Pokémon favoritos. ¡Puedes agregarlos desde tu mazo en la sección "Inicio" o "Mis Cartas"!</p>
      ) : (
        <div className="card-list-container">
          {favorites.map((card) => (
            <div key={card.id} className="favorite-card-item">
              <PokeCard
                pokemon={card}
                showActions={false}
                context="favorites"
              />
              <div className="favorite-card-actions">
                {editingCardId === card.id ? (
                  <div className="rename-form">
                    <input
                      type="text"
                      value={newCustomName}
                      onChange={(e) => setNewCustomName(e.target.value)}
                      placeholder="Nuevo nombre"
                      className="rename-input"
                    />
                    <button onClick={() => handleSaveName(card.id)} className="action-button save-name">Guardar</button>
                    <button onClick={handleCancelEdit} className="action-button cancel-edit">Cancelar</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(card)} className="action-button rename">Renombrar</button>
                    {card.customName && (
                      <button onClick={() => resetFavoriteCardName(card.id)} className="action-button reset-name">Quitar Nombre Personalizado</button>
                    )}
                    <button onClick={() => removeCardFromFavorites(card.id)} className="action-button remove-fav">
                      Quitar de Favoritos
                    </button>
                    {isCardInTeam(card.id) ? (
                      <button onClick={() => removeCardFromTeam(card.id)} className="action-button remove-team">Quitar del Equipo</button>
                    ) : (
                      <button onClick={() => addCardToTeam(card)} className="action-button add-team">Agregar al Equipo</button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisFavoritos;
