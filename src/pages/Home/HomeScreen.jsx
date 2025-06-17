import React, { useState } from "react";
import "./home.css";
import PokeCard from "../../components/PokeCard/PokeCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePoints from "../../hooks/usePoints";
import { useHasReachedCollectionLimit } from "../../hooks/useLimits";

const HomeScreen = () => {
  const [misPokemons] = useLocalStorage("misPokemons", []);
  const { points } = usePoints();
  const state = useHasReachedCollectionLimit();

  const max = 50;
  const count = misPokemons.length;

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(misPokemons.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedPokemons = misPokemons.slice(start, end);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h1>TCG Pokémon</h1>
      <h2>Pokémons {count}/{max} ({state ? "Yes" : "No"})</h2>
      <h3>Puntos: {points}</h3>

      <div className="pagination-buttons">
        <button onClick={handlePrev} disabled={currentPage === 0}>Anterior</button>
        <span>Página {currentPage + 1} de {totalPages || 1}</span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>Siguiente</button>
      </div>

      <div className="pokecards-container">
        <PokeCard id={paginatedPokemons} />
      </div>
    </>
  );
};

export default HomeScreen;
