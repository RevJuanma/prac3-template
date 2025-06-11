import React, { useState } from "react";
import PokemonBooster from "../Booster/Booster"

export default function BoosterSelector() {
  const [type, setType] = useState("basic");

  const handleSelect = (selectedType) => {
    setType(selectedType);
  };

  return (
    <div>
      <h2>Seleccione el tipo de Booster</h2>
      <div className="button-group">
        <button
          onClick={() => handleSelect("basic")}
          className={type === "basic" ? "active" : ""}
        >
          Básico (5 Pokémon)
        </button>
        <button
          onClick={() => handleSelect("premium")}
          className={type === "premium" ? "active" : ""}
        >
          Premium (6 Pokémon)
        </button>
      </div>

      <PokemonBooster
        name={type}
        count={type === "basic" ? 5 : 6}
      />
    </div>
  );
}
