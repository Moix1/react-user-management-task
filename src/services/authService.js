import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const signup = (user) => {
  return axios.post(`${API_URL}signup`, user, {
    withCredentials: true,
  });
};

const login = (credentials) => {
  return axios.post(`${API_URL}login`, credentials, {
    withCredentials: true,
  });
};

export default {
  signup,
  login,
};
