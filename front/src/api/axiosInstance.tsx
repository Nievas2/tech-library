import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  //withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function(config: any) {
    
    return config
  },

  function(error: any) {
    return Promise.reject(error);
  }
)

export default axiosInstance