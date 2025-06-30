import axios from 'axios';
import { ADD_TO_FAVORITE, GET_FAVORITE } from '../utils/constants';

export const addToFavorite = async (id, token) => {
  const response = await axios.post(
    `${ADD_TO_FAVORITE}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getFavorite = async (token) => {
  const response = await axios.get(GET_FAVORITE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};