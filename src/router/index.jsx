import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import { FavoritesScreen, HomeScreen, OpenPacksScreen } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      { path: "fav", element: <FavoritesScreen /> },
      { path: "open-pack", element: <OpenPacksScreen /> },
    ],
  },
  { path: "*", element: <h1>404 not found</h1> },
]);
