import { Link } from "react-router-dom";
import "../../Styles/headerStyle.css";

function Header() {
  return (
    <header>
      <nav>
      <div className="container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"/>
        <Link to="/">Inicio</Link>
        <Link to="/booster">Abrir Sobres</Link>
        <Link to="/mazo">Mi Mazo</Link>
        <Link to="/equipo">Mi Equipo</Link>
        <Link to="/favoritos">Favoritos</Link>
      </div>
      </nav>
    </header>
  );
}

export default Header;
