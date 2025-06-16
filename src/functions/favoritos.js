export const obtenerCartasYFavoritos = () => {
  const cartasGuardadas = localStorage.getItem("cartasPoseidas");
  const favoritosGuardados = localStorage.getItem("favoritos")
  const cartas = cartasGuardadas ? JSON.parse(cartasGuardadas) : [];
  const favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

  return { cartas, favoritos };
};

export const eliminarFavorito = (id, favoritos, setFavoritos) => {
  const nuevosFavoritos = favoritos.filter((favId) => favId !== id);
  setFavoritos(nuevosFavoritos);
  localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
};
