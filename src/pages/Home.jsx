
import { useEffect, useState } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import { usePuntos } from "../context/PuntosContext";
import { cargarDatosIniciales, toggleFavorito, toggleEquipo, eliminarPorPuntos, } from "../functions/home";
import "./Home.css";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [mazo, setMazo] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [favoritos, setFavoritos] = useState([]);
  const [equipo, setEquipo] = useState([]);

  const { puntos, setPuntos } = usePuntos();

  useEffect(() => {
    const { cartas, favoritos, equipo } = cargarDatosIniciales();
    setMazo(cartas);
    setFavoritos(favoritos);
    setEquipo(equipo);
  }, []);

  const totalPaginas = Math.ceil(mazo.length / ITEMS_PER_PAGE);
  const cartasMostrar = mazo.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const irAPagina = (numPagina) => {
    if (numPagina < 1 || numPagina > totalPaginas) return;
    setPaginaActual(numPagina);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="tittle">Mis Cartas Pokemon</h2>
      <h4 className="paginaTexto">Cartas: {mazo.length}/50</h4>
      <h3 className="paginaTexto">Puntos: {puntos}</h3>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {mazo.length === 0 ? (
          <p className="paginaTexto"> No tenes cartas</p>
        ) : (
          cartasMostrar.map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              ButtonComponent={Button}
              extraButtons={
                <>
                  <Button
                    text={
                      favoritos.includes(poke.id)
                        ? "Eliminar de favoritos"
                        : "Agregar a favoritos"
                    }
                    colorClass="agregarFav"
                    onClick={() => toggleFavorito(poke.id, favoritos, setFavoritos)}
                  />
                  <Button
                    text={
                      equipo.includes(poke.id)
                        ? "Eliminar del equipo"
                        : "Agregar a equipo"
                    }
                    colorClass="agregarEquipo"
                    onClick={() => toggleEquipo(poke.id, equipo, setEquipo)}
                  />
                  <Button
                    text="Eliminar por puntos"
                    colorClass="eliminar"
                    onClick={() =>
                      eliminarPorPuntos(poke.id, mazo, setMazo, favoritos, setPuntos)
                    }
                  />
                </>
              }
            />
          ))
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacionContainer">
          <Button
            text="Anterior"
            onClick={() => irAPagina(paginaActual - 1)}
            colorClass="paginacion"
            disabled={paginaActual === 1}
          />
          <span className="paginaTexto">
            Página {paginaActual} de {totalPaginas}
          </span>
          <Button
            text="Siguiente"
            onClick={() => irAPagina(paginaActual + 1)}
            colorClass="paginacion"
            disabled={paginaActual === totalPaginas}
          />
        </div>
      )}
    </div>
  );
}
