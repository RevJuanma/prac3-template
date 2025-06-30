import axios from 'axios';
import { ADD_TO_TEAM, GET_TEAM } from '../utils/constants';

export const addToTeam = async (id, token) => {
  const response = await axios.post(
    `${ADD_TO_TEAM}/${id}`,
    {}, // cuerpo vacío si tu endpoint no necesita payload
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTeam = async (token) => {
  const response = await axios.get(GET_TEAM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
