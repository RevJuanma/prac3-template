import React, { useMemo, useState } from "react";
import PokemonCard from "../Card/Card";
import { useDeck } from "../../context/DeckContext";
import { toast } from "react-toastify";
import { useFavorites } from "../../context/FavoritesContext";
import {
  LIMITE_DE_MAZO,
  POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  POKEMON_EN_EQUIPO_NO_PUEDE_ELIMINARSE_DEL_MAZO,
  SELECT_POKEMON_REQUIRED, AÑADIO_PUNTOS
} from "../../constans/alerts";
import { FaPlus } from "react-icons/fa";
import { usePoints } from "../../context/PointsContext";

export default function PokemonBooster({
  name,
  count = 6,
  maxSelection = 1,
  onClose,
}) {
  const { toggleDeck, isInDeck, isFilled } = useDeck();
  const { isFavorite } = useFavorites();
  const [selected, setSelected] = useState([]);
  const [maxSelectionReached, setMaxSelectionReached] = useState(false);
  const { incrementPoints } = usePoints();

  // IDs aleatorios de Pokémon
  const pokemonIds = useMemo(() => {
    return Array.from({ length: 151 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }, [count]);

  const toggleSelected = (id) => {
    setSelected((prev) => {
      // Si ya estaba seleccionado, lo quitamos
      if (prev.includes(id)) {
        setMaxSelectionReached(false);
        return prev.filter((i) => i !== id);
      }
      // Si no, solo agregamos si no excede el máximo
      if (prev.length < maxSelection) {
        setMaxSelectionReached(false);
        return [...prev, id];
      }
      if (prev.length >= maxSelection) {
        setMaxSelectionReached(true);
        return prev; // no hacemos nada si ya alcanzó el máximo
      }
    });
  };

  const addSelectedToDeck = () => {
    if (selected.length < maxSelection) {
      toast.warn(
        SELECT_POKEMON_REQUIRED(maxSelection)
      );
      return;
    }
    selected.forEach((id) => {
      if (isFavorite(id)) {
        toast.warn(POKEMON_EN_FAVORITOS_NO_PUEDE_ELIMINARSE_DEL_MAZO);
      } else if (isFilled() && !isInDeck(id)) {
        toast.warn(LIMITE_DE_MAZO);
        toast.info(AÑADIO_PUNTOS);
        incrementPoints(1);
      } else {
        toast.success(`¡Pokémon #${id} agregado al mazo!`);
        toggleDeck(id);
      }
    });
    setSelected([]);
    onClose(); // avisamos al padre para cerrar el sobre
  };

  return (
    <div>
      <h1>Sobre {name} de Pokémon</h1>
      <div className="pokemon-row">
        {pokemonIds.map((id) => (
          <div
            key={id}
            style={{
              display: "inline-block",
              margin: "1rem",
              textAlign: "center",
              border: selected.includes(id) ? "2px solid green" : "none",
              borderRadius: "8px",
              padding: "0.5rem",
            }}
          >
            <PokemonCard id={id} />
            <button
              onClick={() => {
                toggleSelected(id);
                if (maxSelectionReached && !selected.includes(id)) {
                  toast.warn(
                    `Solo puedes seleccionar ${maxSelection} Pokémon en el sobre ${name}`
                  );
                }
              }}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: selected.includes(id) ? "#dc3545" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              {selected.includes(id) ? "Cancelar" : "Seleccionar"}
            </button>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={addSelectedToDeck}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            <FaPlus />
            Agregar {selected.length} al mazo
          </button>
        </div>
      )}
    </div>
  );
}
