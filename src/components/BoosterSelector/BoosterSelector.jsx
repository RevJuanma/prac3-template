import React, { useState } from "react";
import PokemonBooster from "../Booster/Booster";
import { usePoints } from "../../context/PointsContext";
import { toast } from "react-toastify";

// 1. Definición del componente y props internos
export default function BoosterSelector() {
  // 2. Estados locales: tipo de booster, visibilidad y clave de remount
  const [type, setType] = useState("basic");
  const [opened, setOpened] = useState(false);
  const [boosterKey, setBoosterKey] = useState(0);

  // 3. Contexto de puntos: obtener y disminuir
  const { points, decrecePoints } = usePoints();

  // 4. Handler para selección de tipo y apertura del booster
  const handleSelectType = (selectedType) => {
    const cost = selectedType === "basic" ? 1 : 2; // coste según tipo
    if (points < cost) {
      // 4.1 Validación temprana: evita operaciones innecesarias
      toast.error("No tiene puntos para abrir el sobre seleccionado");
      return;
    }
    // 4.2 Actualizar puntos y estado tras validación
    decrecePoints(cost);
    toast.success(`Sobre ${selectedType} abierto`);
    setType(selectedType);
    setOpened(true);
    setBoosterKey((prev) => prev + 1); // fuerza re-render de PokemonBooster
  };

  // 5. Función reutilizable para reabrir sin cambiar tipo
  const openNewBooster = () => {
    setOpened(true);
    setBoosterKey((prev) => prev + 1);
  };

  // 6. Cálculo derivado de UI: número de cartas y límite de selección
  const count = type === "basic" ? 5 : 6;
  const maxSelection = type === "basic" ? 1 : 2;

  // 7. Renderizado: botones de tipo y componente Booster condicional
  return (
    <div>
      <h2>Seleccione el tipo de Booster</h2>
      <div className="button-group">
        <button
          onClick={() => handleSelectType("basic")}
          className={type === "basic" ? "active" : ""}
        >
          Básico (5 Pokémon, elige 1)
        </button>
        <button
          onClick={() => handleSelectType("premium")}
          className={type === "premium" ? "active" : ""}
        >
          Premium (6 Pokémon, elige 2)
        </button>
      </div>

      {opened && (
        <PokemonBooster
          key={boosterKey} // 7.1 Key para forzar remount
          name={type} // 7.2 Tipo actual
          count={count} // 7.3 Cantidad de cartas
          maxSelection={maxSelection} // 7.4 Límite interno de selección
          onClose={() => setOpened(false)} // 7.5 Callback de cierre
        />
      )}
    </div>
  );
}
