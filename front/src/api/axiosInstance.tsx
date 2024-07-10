import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function(config: any) {
    const token = localStorage.getItem('user-token');

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