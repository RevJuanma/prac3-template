import React, { createContext, useState, useEffect, useContext } from "react";

const CartasContext = createContext();

export const CartasProvider = ({ children }) => {
  const [cartas, setCartas] = useState([]);

  useEffect(() => {
    const cartasGuardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");
    setCartas(cartasGuardadas);
  }, []);

  const eliminarCarta = (id) => {
    setCartas((prev) => {
      const filtradas = prev.filter((c) => c.id !== id);
      localStorage.setItem("cartasPoseidas", JSON.stringify(filtradas));
      return filtradas;
    });
  };

  return (
    <CartasContext.Provider value={{ cartas, setCartas, eliminarCarta }}>
      {children}
    </CartasContext.Provider>
  );
};

export const useCartas = () => {
  return useContext(CartasContext);
};
