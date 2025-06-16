import React from "react";
import { usePoints } from "../../context/PointsContext";

export function PointsDisplay() {
  const { points } = usePoints();

  return (
    <div style={{ position: "fixed", top: 10, left: 10, padding: "0.5rem", borderRadius: "5px", zIndex: 999 }}>
      💰 Puntos: {points}
    </div>
  );
}
