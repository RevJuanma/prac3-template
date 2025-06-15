import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pages/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App';
import { BoosterSCreen, HomeScreen, TeamScreen, FavoritesScreen, BoosterScreen} from './pages/index';
import Layout from './components/layouts/header';


const router = createBrowserRouter([
  {
    path:"/",
    element:<App></App>
  },
  {
    path:"auth/",
    element:<Layout></Layout>,
    children: [
      {
        path:"Home",
        element:<HomeScreen></HomeScreen>
      },
      {
        path:"Team",
        element:<TeamScreen></TeamScreen>
      },
      {
        path:"Favorites",
        element:<FavoritesScreen></FavoritesScreen>
      },
      {
        path:"Sobres",
        element:<BoosterScreen></BoosterScreen>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
