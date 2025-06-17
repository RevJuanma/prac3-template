import React from "react";
import { usePoints } from "../../context/PointsContext";

// 1. Definición del componente PointsDisplay y obtención de datos de puntos
export function PointsDisplay() {
  const { points } = usePoints(); // Hook para leer el valor actual de puntos

  // 2. Renderizado del indicador de puntos en posición fija
  return (
    <div
      style={{
        position: "fixed", // mantiene el panel siempre visible en la pantalla
        top: 10, // separación desde el borde superior
        left: 10, // separación desde el borde izquierdo
        padding: "0.5rem", // espacio interno para mejor legibilidad
        borderRadius: "5px", // bordes redondeados para estética
        zIndex: 999, // sobrepone el panel por encima de otros elementos
      }}
    >
      {/* 3. Icono y valor dinámico de puntos */}
      💰 Puntos: {points}
    </div>
  );
}
