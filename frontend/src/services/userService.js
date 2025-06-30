import axios from 'axios';
import { USER_ME } from '../utils/constants';

export const getUserMe = async (token) => {
  const response = await axios.get(USER_ME, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
