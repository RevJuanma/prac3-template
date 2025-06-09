import { useEffect, useState } from "react";

const useLocalStorage = (clave, valorInicial) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(clave);
    try {
      return storedValue ? JSON.parse(storedValue) : valorInicial;
    } catch (e) {
      console.error("Error parseando desde localStorage", e);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(value));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }, [clave, value]);

  return [value, setValue];
};

export default useLocalStorage;
