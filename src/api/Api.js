import axios from 'axios';
import { getUserToken } from '../helper/CommonFunction';

const createAPI = () => {
  const instanceCreator = () => {
    return axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "auth-token": getUserToken() ?? ''
      }
    });
  };
  return instanceCreator;
};

export default createAPI;