import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function(config: any) {
    const token = localStorage.getItem('user-token');
    console.log('Token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config
  },

  function(error: any) {
    return Promise.reject(error);
  }
)

export default axiosInstance