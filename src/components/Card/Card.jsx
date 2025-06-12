import React from "react";
import { usePokemon } from "../../hooks/UsePokemon";
import "./Card.css";           
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonCard({ id }) {
  const { data, loading, error } = usePokemon(id);

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