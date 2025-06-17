import React, { useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaEdit, FaUndo } from "react-icons/fa";

// 1. Definición del componente Favorites y hooks iniciales
export default function Favorites() {
  const { favs, setCustomName, removeFavorite } = useFavorites(); // Contexto de favoritos
  const [editingId, setEditingId] = useState(null); // ID en modo edición
  const [newName, setNewName] = useState(""); // Nombre temporal en form

  // 2. Early return: cuando no hay favoritos guardados
  if (favs.length === 0) {
    return <p>No hay favoritos guardados</p>;
  }

  // 3. Render principal: lista de favoritos con lógica de edición o visualización
  return (
    <div>
      <h1>Favoritos guardados:</h1>
      <div className="pokemon-row">
        {favs.map((id) => (
          <div key={id} className="pokemon-card-wrapper">
            {/* 3.1 Modo edición: mostrar formulario para renombrar */}
            {editingId === id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // 3.1.1 Guardar nombre o resetear si está vacío
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
                    // 3.1.2 Cancelar edición y limpiar
                    setEditingId(null);
                    setNewName("");
                  }}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              /* 3.2 Modo visual: mostrar tarjeta con acciones para renombrar o eliminar */
              <PokemonCard
                id={id}
                actions={[
                  {
                    key: "rename-pokemon",
                    label: "Renombrar",
                    icon: <FaEdit />, // Icono de edición
                    onClick: () => setEditingId(id), // Activar modo edición
                  },
                  {
                    key: "reset-name",
                    label: "Reiniciar nombre",
                    icon: <FaUndo />, // Icono de revert
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
