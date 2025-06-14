import React, { useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaEdit, FaUndo } from "react-icons/fa";

export default function Favorites() {
  const { favs, setCustomName, removeFavorite } = useFavorites();
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  if (favs.length === 0) {
    return <p>No hay favoritos guardados</p>;
  }

  return (
    <div>
      <h1>Favoritos guardados:</h1>
      <div className="pokemon-row">
        {favs.map((id) => (
          <div key={id} className="pokemon-card-wrapper">
            {editingId === id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCustomName(id, newName.trim() || undefined);
                  setEditingId(null);
                  setNewName("");
                }}
              >
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nuevo nombre"
                  style={{ textTransform: "capitalize", width: "100%" }}
                />
                <button type="submit">Guardar</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewName("");
                  }}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <PokemonCard
                id={id}
                actions={[
                  {
                    key: "rename-pokemon",
                    label: "Renombrar",
                    icon: <FaEdit />,
                    onClick: () => setEditingId(id),
                  },
                  {
                    key: "reset-name",
                    label: "Reiniciar nombre",
                    icon: <FaUndo />,
                    onClick: () => setCustomName(id, undefined),
                  },
                ]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
