import { usePokemon } from "../../hooks/UsePokemon";
import "./Card.css";     
import { typeColors } from "./Types";
import { useFavorites } from "../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import React, { useState } from "react";
import { useDeck } from "../../context/DeckContext";

export default function PokemonCard({ id, actions = [] }) {
  const { data, loading, error } = usePokemon(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [open, setOpen] = useState(false);
  const hasActions = actions.length > 0;
  const { isInDeck } = useDeck();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="pokemon-card__error">{error}</p>;
  if (!data) return null;

  const type1 = data.types[0].type.name;
  const type2 = data.types[1]?.type.name;

  const color1 = typeColors[type1] || "#FFF";
  const color2 = type2 ? typeColors[type2] || "#FFF" : null;

  const backgroundStyle = {
    background: color2
      ? `linear-gradient(135deg, ${color1}, ${color2})`
      : color1,
  };

  return (
    <div className="pokemon-card" style={backgroundStyle}>
      {/* Icono de Favoritos */}
      {isInDeck(id) && (
        <button
          onClick={() => toggleFavorite(id)}
          aria-label={
            isFavorite(id) ? "Quitar de favoritos" : "Añadir a favoritos"
          }
          style={{
            background: "none",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          {isFavorite(id) ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}

      {hasActions && (
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          aria-label="Mostrar acciones"
        >
          <FaEllipsisV />
        </button>
      )}

      {/* Menú desplegable */}
      {hasActions && open && (
        <ul
          style={{
            borderRadius: "8px",
            padding: "0.5rem",
            listStyle: "none",
            margin: 0,
            zIndex: 999,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {actions.map((action) => (
            <li key={action.key}>
              <button
                onClick={() => {
                  action.onClick(id);
                  setOpen(false); // cerrar menú
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.25rem 0",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {action.icon}
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="pokemon-card__name">{data.name}</h2>
      <p>
        <strong>N°:</strong> {data.id}
      </p>
      <img
        src={data.sprites.other["official-artwork"].front_default}
        alt={data.name}
        width={120}
        height={120}
      />
      <p>
        <strong>Tipos:</strong> {data.types.map((t) => t.type.name).join(", ")}
      </p>
      <div>
        <strong>Estadísticas:</strong>
        <ul className="pokemon-card__stats">
          {data.stats.map((s) => (
            <li key={s.stat.name} className="pokemon-card__stat">
              <span className="pokemon-card__stat-name">
                {s.stat.name.replace("-", " ")}:
              </span>
              <span>{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}