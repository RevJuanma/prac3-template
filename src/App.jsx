import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {Header,Home,MisCartas,MiEquipo,MisFavoritos,Booster,usePoints,GameProvider
} from "./index.jsx";

function Layout() {
  const { points } = usePoints();

  return (
    <GameProvider>
      <Header points={points} />
      <div className="main-content">
        <Outlet />
      </div>
    </GameProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "mis-cartas",
        element: <MisCartas />,
      },
      {
        path: "mi-equipo",
        element: <MiEquipo />,
      },
      {
        path: "mis-favoritos",
        element: <MisFavoritos />,
      },
      {
        path: "abrir-sobres",
        element: <Booster />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
