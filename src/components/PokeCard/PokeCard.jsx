import {useEffect} from "react";
import SinglePokeCard from "./singlePokeCard";
import "./pokeCard.css";
import { usePokemon } from "../../hooks/usePokemonAPI";
import useMyPokemons from "../../hooks/useMyPokemons";
import useMyFavorites from "../../hooks/useMyfavorites";
import useMyTeam from "../../hooks/useMyTeam";
import usePoints from "../../hooks/usePoints";


const PokeCard = ({ id, limitCollectionSelect = null, selectedCount = 0, incrementSelected = null, openPacks = false }) => {

  const { sumarPoints } = usePoints();
  const { data, loading, error } = usePokemon(id);
  const { collection, agregarPokemon, eliminarPokemon } = useMyPokemons();
  const { favorites, agregarFavorito, eliminarFavorito } = useMyFavorites();
  const { team, agregarAlEquipo, eliminarDelEquipo } = useMyTeam();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(data)) return null;

  return (
    <>
      {data.map((pokemon) => (
        <SinglePokeCard
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

export default PokeCard;
