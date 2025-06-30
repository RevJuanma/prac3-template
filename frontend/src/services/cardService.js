import axios from 'axios';
import { SELECT_POKEMON, SELL_POKEMON } from '../utils/constants';

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


export const sellPokemonCard = async (id, token) => {
  const response = await axios.delete(`${SELL_POKEMON}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};