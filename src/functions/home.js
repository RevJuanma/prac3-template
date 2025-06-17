export const cargarDatosIniciales = () => {
  const cartasGuardadas = localStorage.getItem("mazo");
  const favoritosGuardados = localStorage.getItem("favoritos");
  const equipoGuardado = localStorage.getItem("equipo");
  const cartas = parseArray(cartasGuardadas);
  const favoritos = parseArray(favoritosGuardados);
  const equipo = parseArray(equipoGuardado);
  return { cartas, favoritos, equipo };
};

const parseArray = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const toggleFavorito = (id, favoritos, setFavoritos) => {
  const yaEsta = favoritos.includes(id);

  if (yaEsta) {
    const nuevos = favoritos.filter((fid) => fid !== id);
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  } else {
    if (favoritos.length >= 10) {
      alert("Solo podes tener 10 pokemones en favoritos.");
      return;
    }
    const nuevos = [...favoritos, id];
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  }
};

export const toggleEquipo = (id, equipo, setEquipo) => {
  const yaEsta = equipo.includes(id);

  if (yaEsta) {
    const nuevoEquipo = equipo.filter((eId) => eId !== id);
    setEquipo(nuevoEquipo);
    localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
  } else {
    if (equipo.length >= 6) {
      alert("Tu equipo ya esta completo.");
      return;
    }
    const nuevoEquipo = [...equipo, id];
    setEquipo(nuevoEquipo);
    localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
  }
};

export const eliminarPorPuntos = (id, cartas, setCartas, favoritos, setPuntos) => {
  if (favoritos.includes(id)) {
    alert("No se pueden eliminar cartas favoritas");
    return;
  }

  const nuevoCartas = cartas.filter((c) => c.id !== id);
  setCartas(nuevoCartas);
  localStorage.setItem("mazo", JSON.stringify(nuevoCartas));

  setPuntos((prev) => prev + 2);
};
