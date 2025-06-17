// ==================================
// ============ Imports =============
// ==================================
import { useEffect } from "react";
import SinglePokeCard from "./singlePokeCard";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useMyPokemons from "../../hooks/useMyPokemons";
import useMyFavorites from "../../hooks/useMyfavorites";
import useMyTeam from "../../hooks/useMyTeam";
import usePoints from "../../hooks/usePoints";

// ==================================
// ======== Componente Padre ========
// ==================================
const PokeCard = ({
  id,
  limitCollectionSelect = null,
  selectedCount = 0,
  incrementSelected = null,
  openPacks = false,
}) => {
  // ----------------------------------
  // --------- Hooks de Datos ---------
  // ----------------------------------
  const { sumarPoints } = usePoints();
  const { data, loading, error } = usePokemon(id);
  const { collection, agregarPokemon, eliminarPokemon } = useMyPokemons();
  const { favorites, agregarFavorito, eliminarFavorito } = useMyFavorites();
  const { team, agregarAlEquipo, eliminarDelEquipo } = useMyTeam();

  // ----------------------------------
  // --------- Estados Globales -------
  // ----------------------------------
  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(data)) return null;

  // ----------------------------------
  // ------------- Render -------------
  // ----------------------------------
  return (
    <>
      {data.map((pokemon) => (
        <SinglePokeCard
          key={pokemon.id}
          pokemon={pokemon}
          collection={collection}
          favorites={favorites}
          team={team}
          limitCollectionSelect={limitCollectionSelect}
          selectedCount={selectedCount}
          openPacks={openPacks}
          agregarPokemon={agregarPokemon}
          eliminarPokemon={eliminarPokemon}
          agregarFavorito={agregarFavorito}
          eliminarFavorito={eliminarFavorito}
          agregarAlEquipo={agregarAlEquipo}
          eliminarDelEquipo={eliminarDelEquipo}
          sumarPoints={sumarPoints}
          incrementSelected={incrementSelected}
        />
      ))}
    </>
  );
};

// ==================================
// ============ Export ==============
// ==================================
export default PokeCard;
