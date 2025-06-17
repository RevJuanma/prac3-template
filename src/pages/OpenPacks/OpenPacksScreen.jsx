import React, { useState } from "react";
import { getRandomPokemonIds } from "../../functions/idGenerator";
import PokeCard from "../../components/PokeCard/PokeCard";
import usePoints from "../../hooks/usePoints";
import { useHasReachedPointsLimit } from "../../hooks/useLimits";

const OpenPacksScreen = () => {
  const pointsState = useHasReachedPointsLimit();
  const { points, restarPoints } = usePoints();
  const [ids, setIds] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [limit, setLimit] = useState(null);

  const openPack = (count, cost) => {
    setIds(getRandomPokemonIds(count));
    restarPoints(cost);
    setSelectedCount(0);
    setLimit(count === 5 ? 0 : 1);
  };

  return (
    <>
      <h1>Abrir Sobres</h1>
      <h3>Puntos: {points}</h3>
      {pointsState && (
        <>
          <button onClick={() => openPack(5, 5)}>Abrir sobre de 5 cartas</button>
          <button onClick={() => openPack(6, 8)}>Abrir sobre de 6 cartas</button>
        </>
      )}
      <div className="pokecards-container">
        <PokeCard
        id={ids}
        limitCollectionSelect={limit}
        selectedCount={selectedCount}
        incrementSelected={() => setSelectedCount((prev) => prev + 1)}
        openPacks={true}
        />
      </div>
    </>
  );
};

export default OpenPacksScreen;
