import React, { createContext, useContext, useState } from "react";

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(10); // valor inicial

  const incrementPoints = (amount = 1) => setPoints(prev => prev + amount);
  const decrecePoints = (amount = 1) => {
    if (points >= amount) setPoints(prev => prev - amount);
  };

  return (
    <PointsContext.Provider value={{ points, incrementPoints, decrecePoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  return useContext(PointsContext);
}
