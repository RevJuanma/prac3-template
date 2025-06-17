import React, { useState } from "react";
import {
  useHasReachedCollectionLimit,
  useHasReachedFavoritesLimit,
  useHasReachedTeamLimit,
} from "../../hooks/useLimits";
import useLocalStorage from "../../hooks/useLocalStorage";

const SinglePokeCard = ({
  pokemon,
  collection,
  favorites,
  team,
  limitCollectionSelect,
  selectedCount,
  openPacks,
  agregarPokemon,
  eliminarPokemon,
  agregarFavorito,
  eliminarFavorito,
  agregarAlEquipo,
  eliminarDelEquipo,
  sumarPoints,
  incrementSelected,
}) => {
  /* ---------- LÍMITES ---------- */
  const stateCollection = useHasReachedCollectionLimit();
  const stateFavorites  = useHasReachedFavoritesLimit();
  const stateTeam       = useHasReachedTeamLimit();

  /* ---------- OTROS ESTADOS ---------- */
  const [agregado, setAgregado] = useState(false);

  /* ---------- NOMBRE PERSONALIZADO ---------- */
  // Clave única por Pokémon
  const [customName, setCustomName] = useLocalStorage(
    `custom-name-${pokemon.id}`,
    pokemon.name
  );

  // Nombre que realmente se va a pintar
  const nombreAMostrar =
    favorites.includes(pokemon.id) ? customName : pokemon.name;

  /* ---------- HANDLERS ---------- */

const HandlerAgregarAColeccion = () => {
  agregarPokemon(pokemon.id);       // entra a colección
  eliminarFavorito(pokemon.id);     // sale de favoritos

  // Si existía un nombre custom, lo eliminamos
  const key = `custom-name-${pokemon.id}`;
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);   // 1) limpiamos storage
    setCustomName(pokemon.name);    // 2) mostramos nombre original
  }

  incrementSelected?.();
};


  const HandlerEliminarPorPuntos = (points = 0) => {
    sumarPoints(points);
    setAgregado(true);
    incrementSelected?.();
  };

  const handleChangeName = () => {
    const nuevo = prompt("Ingresa un nuevo nombre:");
    if (nuevo?.trim()) setCustomName(nuevo.trim());
  };

  const handleResetName = () => setCustomName(pokemon.name);



  /* ---------- CONDICIONES DE BOTONES ---------- */
  const puedeAgregarColeccion =
    !collection.includes(pokemon.id) &&
    selectedCount <= limitCollectionSelect &&
    !stateCollection;

  const puedeAgregarFavoritos =
    collection.includes(pokemon.id) &&
    !favorites.includes(pokemon.id) &&
    !stateFavorites &&
    !openPacks;

  const puedeAgregarEquipo =
    (collection.includes(pokemon.id) || favorites.includes(pokemon.id)) &&
    !team.includes(pokemon.id) &&
    !openPacks &&
    !stateTeam;

  const puedeLiberar =
    collection.includes(pokemon.id) &&
    !favorites.includes(pokemon.id) &&
    !team.includes(pokemon.id) &&
    !openPacks;

  /* ---------- RENDER ---------- */
  return (
    <div className="poke-card" key={pokemon.id}>
      <h2>{nombreAMostrar.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipo(s): {pokemon.types.map((t) => t.type.name).join(", ")}</p>

      {/* ----------- Colección ----------- */}
      {openPacks ? (
        puedeAgregarColeccion && (
          <button
            onClick={() =>
              !stateCollection
                ? HandlerAgregarAColeccion()
                : HandlerEliminarPorPuntos()
            }
            disabled={agregado}
          >
            {!stateCollection
              ? "Agregar a la Colección"
              : "Liberar por dos puntos"}
          </button>
        )
      ) : (
        puedeAgregarColeccion && (
          <button onClick={HandlerAgregarAColeccion}>
            Agregar a la Colección
          </button>
        )
      )}

      {/* ----------- Favoritos ----------- */}
      {puedeAgregarFavoritos && (
        <button
          onClick={() => {
            agregarFavorito(pokemon.id);
            eliminarPokemon(pokemon.id);
            window.location.reload();
          }}
        >
          Agregar a Favoritos
        </button>
      )}


      {favorites.includes(pokemon.id) && (
        <>
          <button onClick={handleChangeName}>Cambiar nombre</button>
          {customName !== pokemon.name && (
            <button onClick={handleResetName}>Restaurar nombre</button>
          )}

        </>
      )}

      {/* ----------- Equipo ----------- */}
      {puedeAgregarEquipo && (
        <button onClick={() => agregarAlEquipo(pokemon.id)}>
          Agregar al Equipo
        </button>
      )}

      {team.includes(pokemon.id) && (
        <button onClick={() => eliminarDelEquipo(pokemon.id)}>
          Quitar del Equipo
        </button>
      )}

      {/* ----------- Liberar ----------- */}
      {puedeLiberar && (
        <button
          onClick={() => {
            eliminarPokemon(pokemon.id);
            sumarPoints(1);
            window.location.reload();
          }}
        >
          Liberar por Puntos
        </button>
      )}
    </div>
  );
};

export default SinglePokeCard;
