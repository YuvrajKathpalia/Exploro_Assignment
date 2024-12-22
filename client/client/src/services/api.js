import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000/api' ;

const api = axios.create({
  baseURL: API_URL,  
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
