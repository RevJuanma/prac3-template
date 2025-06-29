import axios from 'axios';
import { SELECT_POKEMON } from '../utils/constants';

export const selectPokemonCards = async (payload, token) => {
  const response = await axios.post(
    SELECT_POKEMON,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
