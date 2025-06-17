import { useState, useEffect } from "react";
import { fetchPokemon } from "../services/PokeApiService";

// 1. Hook personalizado: obtiene datos de Pokémon según ID y gestiona estados
export function usePokemon(id) {
  // 2. Estados locales: datos, carga y error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Efecto: se ejecuta cada vez que cambia el ID
  useEffect(() => {
    let isMounted = true; // 3.1 Bandera para evitar actualizar estado tras desmontar

    async function load() {
      if (!id) return; // 3.2 No hacer nada si no hay ID válido
      setLoading(true); // 3.3 Iniciar indicador de carga
      setError(null); // 3.4 Resetear errores previos

      try {
        const result = await fetchPokemon(id); // 3.5 Llamada a API externa
        if (isMounted) setData(result); // 3.6 Actualizar datos solo si sigue montado
      } catch (err) {
        if (isMounted) setError(err.message); // 3.7 Capturar y guardar mensaje de error
      } finally {
        if (isMounted) setLoading(false); // 3.8 Desactivar indicador de carga
      }
    }

    load(); // 4. Invocar la función de carga

    return () => {
      isMounted = false; // 5. Cleanup: desactivar bandera al desmontar
    };
  }, [id]); // 6. Dependencia: vuelve a correr cuando cambie el ID

  // 7. Retornar objeto con estados para consumo en componentes
  return { data, loading, error };
}
