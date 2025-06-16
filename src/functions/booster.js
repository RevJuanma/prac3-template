export const cargarCartasGuardadas = () => {
  try {
    const guardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");
    return Array.isArray(guardadas) ? guardadas : [];
  } catch {
    return [];
  }
};

export const abrirSobre = async (
  tipo,
  puntos,
  setPuntos,
  setSeleccionados,
  setMaxSeleccion,
  setCargando,
  setPokemones
) => {
  const costo = tipo === "basico" ? 5 : 8;
  const max = tipo === "basico" ? 1 : 2;

  if (puntos < costo) {
    alert("No tienes suficientes puntos.");
    return;
  }

  setPuntos((prev) => prev - costo);
  setSeleccionados([]);
  setMaxSeleccion(max);
  setCargando(true);

  const ids = new Set();
  while (ids.size < 5) {
    ids.add(Math.floor(Math.random() * 1025) + 1);
  }

  const datos = await Promise.all(
    [...ids].map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
    )
  );

  setPokemones(datos);
  setCargando(false);
};

export const elegirCarta = (
  pokemon,
  seleccionados,
  setSeleccionados,
  getMaxSeleccion,
  cartasPoseidas,
  setCartasPoseidas,
  setPokemones,
  setMaxSeleccion
) => {
  const maxCartas = 50;
  const maxSeleccion = getMaxSeleccion(); 

  if (
    cartasPoseidas.length >= maxCartas &&
    !cartasPoseidas.some((c) => c.id === pokemon.id)
  ) {
    alert("Solo se puede tener 50 cartas en el mazo.");
    return;
  }

  const yaSeleccionado = seleccionados.find((p) => p.id === pokemon.id);

  let nuevosSeleccionados;
  if (yaSeleccionado) {
    nuevosSeleccionados = seleccionados.filter((p) => p.id !== pokemon.id);
  } else {
    if (seleccionados.length < maxSeleccion) {
      nuevosSeleccionados = [...seleccionados, pokemon];
    } else {
      alert(`Solo podes elegir ${maxSeleccion} carta${maxSeleccion > 1 ? "s" : ""}.`);
      return;
    }
  }

  setSeleccionados(nuevosSeleccionados);

  if (nuevosSeleccionados.length === maxSeleccion) {
    const cartasCombinadas = [...cartasPoseidas];

    nuevosSeleccionados.forEach((nuevaCarta) => {
      const yaExiste = cartasCombinadas.some((c) => c.id === nuevaCarta.id);
      if (!yaExiste && cartasCombinadas.length < maxCartas) {
        cartasCombinadas.push(nuevaCarta);
      }
    });

    localStorage.setItem("cartasPoseidas", JSON.stringify(cartasCombinadas));
    setCartasPoseidas(cartasCombinadas);
    setSeleccionados([]);
    setPokemones([]);
    setMaxSeleccion(0);
  }
};
