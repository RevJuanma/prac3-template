import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authThunks';
import * as jwt_decode from 'jwt-decode';

const token = localStorage.getItem('accessToken');
let user = null;

if (token) {
  const decoded = jwt_decode(token);
  user = {
    email: decoded.sub,
    name: decoded.userName,
    userId: decoded.userId,
    tokenType: decoded.token_type,
    exp: decoded.exp,
    iat: decoded.iat,
  };
}


const initialState = {
  user,
  token: token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { accessToken, refreshToken } = action.payload;

        state.token = accessToken;

        try {
          const decoded = jwt_decode(accessToken);
          state.user = {
            email: decoded.sub,
            name: decoded.userName,
            userId: decoded.userId,
            tokenType: decoded.token_type,
            exp: decoded.exp,
            iat: decoded.iat,
          };
        } catch {
          state.user = null;
        }

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;