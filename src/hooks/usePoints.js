import useLocalStorage from "./useLocalStorage";

const usePuntos = () => {
  const [puntos, setPuntos] = useLocalStorage("puntos", 0);

  const sumarPuntos = (cantidad) => {
    setPuntos((prev) => prev + cantidad);
  };

  const restarPuntos = (cantidad) => {
    setPuntos((prev) => Math.max(0, prev - cantidad));
  };

  const resetearPuntos = () => {
    setPuntos(0);
  };

  return {
    puntos,
    setPuntos,
    sumarPuntos,
    restarPuntos,
    resetearPuntos,
  };
};

export default usePuntos;
