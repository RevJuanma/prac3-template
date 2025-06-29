import { NavLink } from 'react-router-dom';
import './styles/Navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/authThunks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap();
    navigate('/login');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
};

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/inventory" className="nav-link">Inventory</NavLink>
        <NavLink to="/team" className="nav-link">Team</NavLink>
        <NavLink to="/favorite" className="nav-link">Favorite</NavLink>
        <NavLink to="/booster-pack" className="nav-link">Booster Pack</NavLink>
      </div>

      {user && (
        <div className="navbar-right">
          <div className="user-info" onClick={toggleDropdown}>
            <span className="username">{user.name}</span>
            <div className="avatar">{getInitial(user.name)}</div>
            <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;