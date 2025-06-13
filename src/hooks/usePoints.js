import useLocalStorage from "./useLocalStorage";

const usePoints = () => {
  const [points, setPoints] = useLocalStorage("Puntos", 0);

  const sumarPoints = (cantidad) => {
    setPoints((prev) => prev + cantidad);
  };

  const restarPoints = (cantidad) => {
    setPoints((prev) => Math.max(0, prev - cantidad));
  };

  const resetearPoints = () => {
    setPoints(0);
  };

  return {
    points,
    setPoints,
    sumarPoints,
    restarPoints,
    resetearPoints,
  };
};

export default usePoints;
