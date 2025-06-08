import { StrictMode, use, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


useEffect(()=>{
  localStorage.setItem("nombre","eze");
  localStorage.setItem("Materias", JSON.stringify([{
    
  }]))
},[]);


const handleCLick=()=>{
  const localNombre=JSON.parse(localStorage.getItem())

}


localStorage.removeItem("nombre")
localStorage.clear();