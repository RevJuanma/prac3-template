import React from "react";

const Container = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        color: "black",
        padding: 12,
        maxWidth: 200,
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
