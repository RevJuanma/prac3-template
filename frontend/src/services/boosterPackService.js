import axios from 'axios';
import { BOOSTER_PACK} from '../utils/constants';

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