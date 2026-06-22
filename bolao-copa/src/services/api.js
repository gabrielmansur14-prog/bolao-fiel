import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-bolao-fielmino.onrender.com',
});

export default api;