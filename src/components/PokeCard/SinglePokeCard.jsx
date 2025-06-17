// ==================================
// ============ Imports =============
// ==================================
import React, { useState } from "react";
import {
  useHasReachedCollectionLimit,
  useHasReachedFavoritesLimit,
  useHasReachedTeamLimit,
} from "../../hooks/useLimits";
import useLocalStorage from "../../hooks/useLocalStorage";

// ==================================
// ======= Componente Tarjeta =======
// ==================================
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
  // ----------------------------------
  // --------- Estados & Límites ------
  // ----------------------------------
  const stateCollection = useHasReachedCollectionLimit();
  const stateFavorites  = useHasReachedFavoritesLimit();
  const stateTeam       = useHasReachedTeamLimit();
  const [agregado, setAgregado] = useState(false);

  // ----------------------------------
  // ---------- Nombre Custom ---------
  // ----------------------------------
  const [customName, setCustomName] = useLocalStorage(
    `custom-name-${pokemon.id}`,
    pokemon.name
  );

  const nombreAMostrar =
    favorites.includes(pokemon.id) ? customName : pokemon.name;

  // ----------------------------------
  // --------- Handlers ---------------
  // ----------------------------------
  const HandlerAgregarAColeccion = () => {
    agregarPokemon(pokemon.id);
    eliminarFavorito(pokemon.id);
    
    const key = `custom-name-${pokemon.id}`;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      setCustomName(pokemon.name);
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

  // ----------------------------------
  // --------- Condiciones Botones ----
  // ----------------------------------
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

  // ----------------------------------
  // --------- Render ----------------
  // ----------------------------------
  return (
    <div className="poke-card" key={pokemon.id}>
    <h2>{nombreAMostrar.toUpperCase()}</h2>
    <h2>Numero: {pokemon.id}</h2>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <p>Tipo(s): {pokemon.types.map((t) => t.type.name).join(", ")}</p>
    <ul>
      {pokemon.stats.map((stat) => (
        <li key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </li>
      ))}
    </ul>

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

// ==================================
// ============ Export ==============
// ==================================
export default SinglePokeCard;
