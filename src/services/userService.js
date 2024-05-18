import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getUsers = () => {
  return axios.get(API_URL, { withCredentials: true });
};

const getUser = (id) => {
  return axios.get(`${API_URL}${id}`, { withCredentials: true });
};

const createUser = (user) => {
  return axios.post(API_URL, user, { withCredentials: true });
};

const updateUser = (id, user) => {
  return axios.put(`${API_URL}${id}`, user, { withCredentials: true });
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}${id}`, { withCredentials: true });
};

const uploadProfilePicture = (formData, token) => {
  return axios.put(`${API_URL}me/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  });
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
};
