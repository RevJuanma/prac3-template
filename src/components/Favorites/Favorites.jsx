import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import PokemonCard from "../Card/Card";

export default function Favorites() {
  const { favs } = useFavorites();

  if (favs.length === 0) {
    return <p>No hay favoritos guardados</p>;
  }

  return (
    <div>
      <h1>Favoritos guardados:</h1>
      <div className="pokemon-row">
        {favs.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}