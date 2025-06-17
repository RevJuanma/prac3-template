import React from "react";

// 1. Definición del componente Pagination y sus props de control
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // 2. Renderizado del contenedor de paginación con estilos flex
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {/* 3. Botón de página anterior: decrementa currentPage y se deshabilita en la página 1 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="px-3 py-1 rounded disabled:opacity-50"
      >
        «
      </button>

      {/* 4. Indicador de página actual versus total */}
      <span>
        Página {currentPage} de {totalPages}
      </span>

      {/* 5. Botón de página siguiente: incrementa currentPage y se deshabilita en la última página */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="px-3 py-1 rounded disabled:opacity-50"
      >
        »
      </button>
    </div>
  );
}
