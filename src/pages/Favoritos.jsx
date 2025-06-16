import { useEffect, useState } from "react";
import { PokeCard } from "../components";
import "./Home.css";
import Button from "../components/Button/Button";
import { obtenerCartasYFavoritos, eliminarFavorito } from "../functions/favoritos";

const MAX_FAVORITOS = 10;

export default function Favoritos() {
  const [cartasPoseidas, setCartasPoseidas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const { cartas, favoritos } = obtenerCartasYFavoritos();
    setCartasPoseidas(cartas);
    setFavoritos(favoritos);
  }, []);

  const cartasFavoritas = cartasPoseidas.filter((carta) =>
    favoritos.includes(carta.id)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="tittle">Mis Favoritos</h2>

      {cartasFavoritas.length === 0 ? (
        <p className="paginaTexto">No hay cartas en favoritas.</p>
      ) : (
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {cartasFavoritas.slice(0, MAX_FAVORITOS).map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              ButtonComponent={Button}
              extraButtons={
                <Button
                  text="Eliminar de favoritos"
                  colorClass="paginacion"
                  onClick={() =>
                    eliminarFavorito(poke.id, favoritos, setFavoritos)
                  }
                />
              }
            />
          ))}
        </div>
      )}

      {favoritos.length > MAX_FAVORITOS && (
        <p className="alertaTexto">
          Solo podes tener {MAX_FAVORITOS} cartas favoritas.
        </p>
      )}
    </div>
  );
}
