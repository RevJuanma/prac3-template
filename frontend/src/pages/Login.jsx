import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/auth/authThunks';
import { useNavigate } from 'react-router-dom';

import TextField from '../components/TextField';
import ErrorMessage from '../components/ErrorMessage';
import CenteredContainer from '../components/CenteredContainer';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthToggleLink from '../components/AuthToggleLink';

const Login = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/home');
    } catch (err) {
      console.error('Error en el login:', err);
    }
  };

  return (
    <CenteredContainer>
      <AuthFormWrapper
        title="Iniciar sesión"
        onSubmit={handleSubmit}
        buttonLabel={loading ? 'Ingresando...' : 'Ingresar'}
        disabled={loading}
      >
        <TextField
          label="Email"
          type="email"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="email@ejemplo.com"
        />

        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
        />

        {error && <ErrorMessage message={error} />}
        <AuthToggleLink />
      </AuthFormWrapper>
    </CenteredContainer>
  );
};

export default Login;
