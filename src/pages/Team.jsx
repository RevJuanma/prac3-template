import { useEffect, useState } from "react";
import "./Home.css";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import {
  cargarEquipoYCartas,
  obtenerEquipoCompleto,
  removerDeEquipo,
} from "../functions/team";

export default function Team() {
  const [equipo, setEquipo] = useState([]);
  const [cartasPoseidas, setCartasPoseidas] = useState([]);

  useEffect(() => {
    const { equipo, cartas } = cargarEquipoYCartas();
    setEquipo(equipo);
    setCartasPoseidas(cartas);
  }, []);

  const handleRemover = (id) => {
    const actualizado = removerDeEquipo(id, equipo);
    setEquipo(actualizado);
  };

  const equipoCompleto = obtenerEquipoCompleto(equipo, cartasPoseidas);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="tittle">Mi Equipo Pokemon ({equipoCompleto.length}/6)</h2>

      {equipoCompleto.length === 0 ? (
        <p className="paginaTexto">No tenes pokemones en tu equipo.</p>
      ) : (
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {equipoCompleto.map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              ButtonComponent={Button}
              extraButtons={
                <Button
                  text="Remover del equipo"
                  colorClass="paginacion"
                  onClick={() => handleRemover(poke.id)}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
