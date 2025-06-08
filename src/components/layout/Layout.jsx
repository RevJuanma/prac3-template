import { Outlet } from "react-router";
import "./layout.css"
import "@fontsource/press-start-2p";

const Layout = () => {
  return (
    <>
    <div className="container">
      <a href="/">Inicio</a>
      <a href="/favorites">Favoritos</a>
      <a href="/open-pack">Abrir Sobres</a>
      <a href="/teams">Equipo</a>
    </div>
    <Outlet/>
    </>
  );
};

export default Layout;
