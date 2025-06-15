import React, { useState } from "react";
import PokemonBooster from "../Booster/Booster";
import { usePoints } from "../../context/PointsContext";
import { toast } from "react-toastify";


export default function BoosterSelector() {
  const [type, setType] = useState("basic");
  const [opened, setOpened] = useState(false);
  const [boosterKey, setBoosterKey] = useState(0);
  const { points, decrecePoints } = usePoints();

 const handleSelectType = (selectedType) => {
  const cost = selectedType === "basic" ? 1 : 2;

  if (points < cost) {
    toast.error("No tiene puntos para abrir el sobre seleccionado");
    return;
  }

  decrecePoints(cost);
  toast.success(`Sobre ${selectedType} abierto`);
  setType(selectedType);
  setOpened(true);
  setBoosterKey((prev) => prev + 1);
};

  const openNewBooster = () => {
    setOpened(true);
    setBoosterKey((prev) => prev + 1);
  };

  const count = type === "basic" ? 5 : 6;
  const maxSelection = type === "basic" ? 1 : 2;

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
          key={boosterKey}
          name={type}
          count={count}
          maxSelection={maxSelection}
          onClose={() => setOpened(false)}
        />
      )}
    </div>
  );
}
