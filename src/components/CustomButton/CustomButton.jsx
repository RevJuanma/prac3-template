import React, { useState } from "react";

const CustomButton = ({
  num1 = 0,
  num2 = 0,
  texto = "Clickear!",
  handleClick,
}) => {
  const [resultado, setResultado] = useState(0);

  return (
    <>
      <p>El numero 1 es: {num1}</p>
      <p>El numero 2 es: {num2}</p>
      <p>{resultado > 0 ? `El resultado de la suma es ${resultado}` : "No se realizo la suma todavia"}</p>
      <button
        onClick={() => {
          setResultado(num1 + num2);
        }}
      >
        {texto}
      </button>
    </>
  );
};

export default CustomButton;
