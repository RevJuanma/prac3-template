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