import { Link, useLocation } from 'react-router-dom';

const AuthToggleLink = () => {
  const { pathname } = useLocation();

  const isLogin = pathname === '/login';
  const targetPath = isLogin ? '/register' : '/login';
  const message = isLogin
    ? "¿No tenés cuenta? Registrate acá"
    : "¿Ya tenés cuenta? Iniciá sesión";

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Link to={targetPath} style={{ color: '#007bff', textDecoration: 'underline' }}>
        {message}
      </Link>
    </div>
  );
};

export default AuthToggleLink;