import React from "react";
import { useDeck } from "../../context/DeckContext";
import PokemonCard from "../Card/Card";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useTeam } from "../../context/TeamContext";
import { useFavorites } from "../../context/FavoritesContext";
import {
  POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  LIMITE_EQUIPO,
  AÑADIO_EQUIPO,
  QUITAR_EQUIPO,
  AÑADIO_PUNTOS,
} from "../../constans/alerts";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import { useMemo, useState } from "react";
import { usePoints } from "../../context/PointsContext";

export default function Deck() {
  const { toggleDeck, deck } = useDeck();
  const { toggleTeam, isInTeam, isFilledTeams } = useTeam();
  const { isFavorite } = useFavorites();
  const { incrementPoints } = usePoints();

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Total de páginas
  const totalPages = Math.ceil(deck.length / ITEMS_PER_PAGE);

  // Subconjunto memoizado de Pokémon que se va a renderizar
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return deck.slice(start, start + ITEMS_PER_PAGE);
  }, [deck, currentPage]);

  if (deck.length === 0) {
    return <p>No tienes Pokémon en tu mazo</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mazo:</h1>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
          }
        }}
      />

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
                incrementPoints (1);
                toast.info (AÑADIO_PUNTOS);
              }
            },
          };

          const inTeam = isInTeam(id);
          const toggleTeamAction = {
            key: `toggle-team-${id}`,
            label: inTeam ? "Quitar del equipo" : "Agregar al equipo",
            icon: inTeam ? <FaMinus /> : <FaPlus />,
            onClick: () => {
              if (isFilledTeams() && !inTeam) {
                toast.warn(LIMITE_EQUIPO);
              } else {
                inTeam
                  ? toast.info(QUITAR_EQUIPO)
                  : toast.success(AÑADIO_EQUIPO);
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
