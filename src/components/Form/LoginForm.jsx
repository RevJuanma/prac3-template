import React from "react";
import { formTextValues } from "../../utils/formTextValues";
import TextField from "./TextField/TextField";

/**
 * Genera un formulario de login
 *
 * Input de Usuario
 * Input de Contraseña
 *
 * Link Forgot Password
 * Button Submit
 *
 * @param title titulo del formuarlio @default formTextValues.loginFormTitle
 *
 * @returns Formulario de Login | LoginForm
 */
const LoginForm = ({ title = formTextValues.loginFormTitle }) => {
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h4>{title}</h4>
      <TextField label={formTextValues.inputLabelValueUser} />
      <TextField
        label={formTextValues.inputLabelValuePassword}
        type={"password"}
      >
        <a href="#">{formTextValues.forgotPasswordText}</a>
      </TextField>

      <button
        type="button"
        onClick={() =>
          console.log(
            `error al cargar el ${formTextValues.inputLabelValueUser}`
          )
        }
      >
        {formTextValues.textButtonValue}
      </button>
    </form>
  );
};

export default LoginForm;
