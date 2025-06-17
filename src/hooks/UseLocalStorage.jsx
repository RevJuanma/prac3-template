import { useState, useEffect } from "react";

// 1. Hook personalizado: sincroniza estado con localStorage bajo una clave dada
export default function useLocalStorage(key, initialValue) {
  // 2. Inicializar estado leyendo de localStorage una sola vez
  const [state, setState] = useState(() => {
    // 2.1 En entornos sin window (SSR), usar valor inicial directamente
    if (typeof window === "undefined") return initialValue;
    try {
      // 2.2 Intento de lectura y parseo JSON desde localStorage
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      // 2.3 Captura errores de lectura y devuelve valor inicial
      console.error(`Error leyendo ${key} de localStorage`, err);
      return initialValue;
    }
  });

  // 3. Efecto: cada vez que cambie la clave o el estado, actualizar localStorage
  useEffect(() => {
    try {
      // 3.1 Serializar el estado y almacenarlo
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      // 3.2 Captura errores de escritura y los reporta en consola
      console.error(`Error guardando ${key} en localStorage`, err);
    }
  }, [key, state]);

  // 4. Devolver el estado actual y la función para actualizarlo
  return [state, setState];
}
