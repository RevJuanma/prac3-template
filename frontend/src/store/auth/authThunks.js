import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REGISTER_URL, LOGIN_URL } from '../../utils/constants';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(REGISTER_URL, formData);
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.error || 'Error al registrarse';
      return rejectWithValue(backendMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials);
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.error || 'Error al iniciar sesión';
      return rejectWithValue(backendMessage);
    }
  }
);