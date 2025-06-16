import { useState, useEffect } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import { usePuntos } from "../context/PuntosContext";
import {
  cargarCartasGuardadas,
  abrirSobre,
  elegirCarta
} from "../functions/booster";
import "./Booster.css";

export default function Booster() {
  const { puntos, setPuntos } = usePuntos();
  const [pokemones, setPokemones] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [maxSeleccion, setMaxSeleccion] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [cartasPoseidas, setCartasPoseidas] = useState([]);

  // getter para maxSeleccion actualizado
  const getMaxSeleccion = () => maxSeleccion;

  useEffect(() => {
    const guardadas = cargarCartasGuardadas();
    setCartasPoseidas(guardadas);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="puntos">Puntos: {puntos}</h2>

      <h4 className="paginaTexto">
        Cartas: {cartasPoseidas.length} / 50
      </h4>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Button
          text="Abrir sobre Básico (5 pts)"
          onClick={() =>
            abrirSobre(
              "basico",
              puntos,
              setPuntos,
              setSeleccionados,
              setMaxSeleccion,
              setCargando,
              setPokemones
            )
          }
          colorClass="base"
        />
        <Button
          text="Abrir sobre Premium (8 pts)"
          onClick={() =>
            abrirSobre(
              "premium",
              puntos,
              setPuntos,
              setSeleccionados,
              setMaxSeleccion,
              setCargando,
              setPokemones
            )
          }
          colorClass="premium"
        />
      </div>

      {cargando && <p className="paginaTexto">Abriendo sobres...</p>}

      {maxSeleccion > 0 && (
        <p className="paginaTexto">
          Cartas seleccionadas: {seleccionados.length} / {maxSeleccion}
        </p>
      )}

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {pokemones.map((poke) => (
          <PokeCard
            key={poke.id}
            pokemon={poke}
            onSelect={(p) =>
              elegirCarta(
                p,
                seleccionados,
                setSeleccionados,
                getMaxSeleccion,
                cartasPoseidas,
                setCartasPoseidas,
                setPokemones,
                setMaxSeleccion
              )
            }
            isSelected={seleccionados.some((p) => p.id === poke.id)}
            showSelectButton={true}
            disabled={
              seleccionados.length >= maxSeleccion &&
              !seleccionados.some((p) => p.id === poke.id)
            }
            ButtonComponent={Button}
          />
        ))}
      </div>
    </div>
  );
}
