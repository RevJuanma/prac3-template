import React from "react";

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
