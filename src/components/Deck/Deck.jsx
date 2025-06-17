import React, { useMemo, useState } from "react";
import { useDeck } from "../../context/DeckContext";
import { useTeam } from "../../context/TeamContext";
import { useFavorites } from "../../context/FavoritesContext";
import { usePoints } from "../../context/PointsContext";
import PokemonCard from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  LIMITE_EQUIPO,
  AÑADIO_EQUIPO,
  QUITAR_EQUIPO,
  AÑADIO_PUNTOS,
} from "../../constans/alerts";
import { toast } from "react-toastify";

// 1. Definición del componente Deck
export default function Deck() {
  // 2. Conexión a contextos: mazo, equipo, favoritos y puntos
  const { deck, toggleDeck } = useDeck();
  const { team, isInTeam, toggleTeam, isFilledTeams } = useTeam();
  const { isFavorite } = useFavorites();
  const { incrementPoints } = usePoints();

  // 3. Estado de paginación y configuración
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(deck.length / ITEMS_PER_PAGE);

  // 4. Cálculo memoizado de los IDs a mostrar en la página actual
  // Utiliza useMemo para evitar cálculos innecesarios en cada render
  // Memoizar es importante para optimizar el rendimiento, especialmente con listas grandes
  // No tiene que ver con localStorage, preserva el estado de la paginación entre renders
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return deck.slice(start, start + ITEMS_PER_PAGE);
  }, [deck, currentPage]);

  // 5. Caso: mazo vacío muestra mensaje simple
  if (deck.length === 0) {
    return <p>No tienes Pokémon en tu mazo</p>;
  }

  // 6. Render principal: título y controles de paginación
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mazo:</h1>
      {/* 6.1 Paginación superior */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
          }
        }}
      />

      {/* 7. Listado de cartas con acciones dinámicas */}
      <div className="pokemon-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentItems.map((id) => {
          const removeFromDeckAction = {
            key: `remove-from-deck-${id}`,
            label: "Quitar del mazo",
            icon: <FaMinus />,
            onClick: () => {
              if (isFavorite(id)) {
                toast.warn(POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO);
              } else if (isInTeam(id)) {
                toast.warn(POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO);
              } else {
                toggleDeck(id);
                incrementPoints(1);
                toast.info(AÑADIO_PUNTOS);
              }
            },
          };

          // 7.2 Acción para alternar en equipo con validación de límite
          const inTeam = isInTeam(id);
          const toggleTeamAction = {
            key: `toggle-team-${id}`,
            label: inTeam ? "Quitar del equipo" : "Agregar al equipo",
            icon: inTeam ? <FaMinus /> : <FaPlus />,
            onClick: () => {
              if (isFilledTeams() && !inTeam) {
                toast.warn(LIMITE_EQUIPO);
              } else {
                toast[inTeam ? "info" : "success"](
                  inTeam ? QUITAR_EQUIPO : AÑADIO_EQUIPO
                );
                toggleTeam(id);
              }
            },
          };

          return (
            <PokemonCard
              key={id}
              id={id}
              actions={[removeFromDeckAction, toggleTeamAction]}
            />
          );
        })}
      </div>

      {/* 8. Paginación inferior */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
}
