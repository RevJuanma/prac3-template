let puntosIniciales = 50;

function comprarCartas(puntos, tipoSobre) {
  let precio = 0;

  if (tipoSobre === "sobreBasico") precio = 5;
  if (tipoSobre === "sobrePremium") precio = 8;

  if (puntos >= precio) {
    return { puntos: puntos - precio, error: null };
  } else {
    return { puntos: puntos, error: "no tienes suficientes puntos" };
  }
}


export { puntosIniciales, comprarCartas};