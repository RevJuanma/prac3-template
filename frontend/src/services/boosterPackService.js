import axios from 'axios';
import { BOOSTER_PACK, BUY_BOOSTER_PACK, TYPE_BOOSTER_PACK} from '../utils/constants';

export const getBoosterPacks = async (token) => {
  const response = await axios.get(BOOSTER_PACK, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const openBoosterPack = async (boosterId, token) => {
  const response = await axios.post(
    `${BOOSTER_PACK}/${boosterId}/open`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const buyBoosterPacks = async (idTypeBoosterPack, count, token) => {
  const response = await axios.post(
    BUY_BOOSTER_PACK,
    { idTypeBoosterPack, count },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getBoosterPackTypes = async () => {
  const response = await axios.get(TYPE_BOOSTER_PACK);
  return response.data;
};