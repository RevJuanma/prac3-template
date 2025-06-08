import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import { FavoritesScreen, HomeScreen, OpenPacksScreen,PokemonViewer, TeamScreen } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      { path: "favorites", element: <FavoritesScreen /> },
      { path: "open-pack", element: <OpenPacksScreen /> },
      { path: "teams", element: <TeamScreen /> },
      {path:"pruebas",element:<PokemonViewer/>}
    ],
  },
  { path: "*", element: <h1>404 not found</h1> },
]);
