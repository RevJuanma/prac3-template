import axios from 'axios';
import { INVENTORY_URL } from '../utils/constants';

export const getInventory = async (page = 0, size = 10, token) => {
  const response = await axios.get(
    `${INVENTORY_URL}?page=${page}&size=${size}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// http://localhost:8082/api/v1/inventory?page=0&size=10