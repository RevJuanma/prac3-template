import React, { useEffect, useState } from "react";

export default function PokemonCard({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon no encontrado");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "300px",
        background: "#fff",
      }}
    >
      <h2 style={{ textTransform: "capitalize" }}>{data.name}</h2>
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
        <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0 0" }}>
          {data.stats.map((s) => (
            <li
              key={s.stat.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.25rem",
              }}
            >
              <span style={{ textTransform: "capitalize" }}>
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
