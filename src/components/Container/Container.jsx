import React from "react";

const Container = ({ children }) => {
  return (
    <div style={{ backgroundColor: "red", padding: 10 }}>
      <input type="text" value={"123"}></input>
      {children}
      <input type="text" value={"123"}></input>
    </div>
  );
};

export default Container;
