import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/auth/authThunks';
import { useNavigate } from 'react-router-dom';

import TextField from '../components/TextField';
import ErrorMessage from '../components/ErrorMessage';
import CenteredContainer from '../components/CenteredContainer';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthToggleLink from '../components/AuthToggleLink';

const Register = () => {
  const dispatch = useDispatch(); // hook para actualizar el estado global (Redux) (ej:acción que hace el registro)
  const { error, loading } = useSelector(state => state.auth); // hook q permite seleccionar una parte del estado global  de redux
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(formData)).unwrap(); // .unwrap() permite que la promesa lance una excepción si falla
      navigate('/home');
    } catch (err) {
      console.error('Error en el registro:', err);
    }
  };

  return (
    <CenteredContainer>
      <AuthFormWrapper
        title="Registro"
        onSubmit={handleSubmit}
        buttonLabel={loading ? 'Registrando...' : 'Registrarse'}
        disabled={loading}
      >
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre de Maestro Pokémon"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
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

export default Register;
