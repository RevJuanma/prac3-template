import React, { useMemo, useState } from "react";
import PokemonCard from "../Card/Card";
import { useDeck } from "../../context/DeckContext";
import { toast } from "react-toastify";
import {
  LIMITE_DE_MAZO,
  AÑADIO_PUNTOS_MULTIPLES,
  SELECT_POKEMON_REQUIRED,
  AÑADIO_PUNTOS,
} from "../../constans/alerts";
import { FaPlus } from "react-icons/fa";
import { usePoints } from "../../context/PointsContext";

// 1. Definición del componente y props entrantes
export default function PokemonBooster({
  name,
  count = 6,
  maxSelection = 1,
  onClose,
}) {
  // 2. Contextos globales: mazo y puntos
  const { toggleDeck, isInDeck, isFilled, availableSlots } = useDeck();
  const { incrementPoints } = usePoints();

  // 3. Estados locales: lista de seleccionados + bandera de límite alcanzado
  const [selected, setSelected] = useState([]);
  const [maxSelectionReached, setMaxSelectionReached] = useState(false);

  // 4. Generación inicial de IDs aleatorios, recalcula solo cuando cambia "count"
  const pokemonIds = useMemo(() => {
    return Array.from({ length: 151 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }, [count]);

  // 5. Función para alternar selección de un Pokémon
  const toggleSelected = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // Quitar si ya estaba
        setMaxSelectionReached(false);
        return prev.filter((i) => i !== id);
      }
      if (prev.length < maxSelection) {
        // Agregar si hay espacio
        setMaxSelectionReached(false);
        return [...prev, id];
      }
      // Marcar si intentan superar el límite
      setMaxSelectionReached(true);
      return prev;
    });
  };

  // 6. Función principal: procesar y mover seleccionados al mazo
  const addSelectedToDeck = () => {
    // 6.1 Validación de selección mínima
    if (selected.length < maxSelection) {
      toast.warn(SELECT_POKEMON_REQUIRED(maxSelection));
      return;
    }

    // 6.2 Guardar estado inicial del mazo y contadores
    const initiallyFull = isFilled();
    let addedCount = 0;
    let pointExchangeCount = 0;

    // 6.3 Iterar cada id seleccionado
    selected.forEach((id) => {
      if (initiallyFull || addedCount >= availableSlots() || isInDeck(id)) {
        // Cuenta para intercambio si no cabe o ya existe
        pointExchangeCount++;
      } else {
        // Agregar al mazo y notificar
        toggleDeck(id);
        toast.success(`¡Pokémon #${id} agregado al mazo!`);
        addedCount++;
      }
    });

    // 6.4 Si hubo intercambios, recompensar puntos y notificar una sola vez
    if (pointExchangeCount > 0) {
      incrementPoints(pointExchangeCount);
      toast.warn(LIMITE_DE_MAZO);
      pointExchangeCount === 1
        ? toast.info(AÑADIO_PUNTOS)
        : toast.info(AÑADIO_PUNTOS_MULTIPLES(pointExchangeCount));
    }

    // 6.5 Limpieza: reset y cierre de overlay
    setSelected([]);
    onClose();
  };

  // 7. Render: paso a paso del flujo de UI
  return (
    <div>
      <h1>Sobre {name} de Pokémon</h1>
      <div className="pokemon-row">
        {/* 7.1 Mostrar cada carta y botón de selección */}
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
                  // Aviso inmediato si se supera el límite
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
          {/* 7.2 Botón para confirmar y agregar todos seleccionados */}
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
            <FaPlus /> Agregar {selected.length} al mazo
          </button>
        </div>
      )}
    </div>
  );
}
