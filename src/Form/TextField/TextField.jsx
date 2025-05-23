import React from "react";
/**
 * TextField es un componente de formulario que representa un campo de texto.
 */
const TextField = ({ label, type = "text", children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <label>{label}</label>
      <input type={type} />
      {children}
    </div>
  );
};

export default TextField;