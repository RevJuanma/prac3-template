import { useState, useEffect } from 'react';

export const usePoints = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('pokemonGamePoints');
    return savedPoints ? parseInt(savedPoints, 10) : 100;
  });

  useEffect(() => {
    localStorage.setItem('pokemonGamePoints', points.toString());
  }, [points]);

  const addPoints = (amount) => {
    setPoints(prevPoints => prevPoints + amount);
  };

  const subtractPoints = (amount) => {
    if (points >= amount) {
      setPoints(prevPoints => prevPoints - amount);
      return true;
    }
    alert("¡Puntos insuficientes!");
    return false;
  };

  return { points, addPoints, subtractPoints };
};
