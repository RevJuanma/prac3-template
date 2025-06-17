import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
export const MAX_FAVS_SIZE = 10; // 1. Definir límite máximo de favoritos

// 2. Crear contexto para compartir estado de favoritos
export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // 3. Inicializar estado persistente: lista de IDs favoritos
  const [favs, setFavs] = useLocalStorage("favorites", []);
  //    y nombres personalizados por ID
  const [customNames, setCustomNames] = useLocalStorage("customNames", {});

  // 4. Verificar si un Pokémon está en favoritos
  const isFavorite = (id) => favs.includes(id);

  // 5. Función para alternar favorito: agrega o elimina según estado y límite
  const toggleFavorite = (id) => {
    setFavs(
      (curr) =>
        curr.includes(id)
          ? curr.filter((x) => x !== id) // 5.1 Si ya existe, remueve
          : curr.length < MAX_FAVS_SIZE // 5.2 Si no existe y hay espacio, agrega
          ? [...curr, id]
          : curr // 5.3 Si está lleno, no cambia
    );
  };

  // 6. Guardar o reiniciar nombre personalizado de un favorito
  const setCustomName = (id, name) =>
    setCustomNames((curr) => ({ ...curr, [id]: name }));

  // 7. Indicar si se alcanzó el límite de favoritos
  const isFilledFavorites = () => favs.length === MAX_FAVS_SIZE;

  // 8. Proveer valores y funciones a toda la aplicación
  return (
    <FavoritesContext.Provider
      value={{
        favs,
        toggleFavorite,
        isFavorite,
        setCustomName,
        customNames,
        isFilledFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// 9. Hook personalizado: asegura que el contexto esté disponible
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
