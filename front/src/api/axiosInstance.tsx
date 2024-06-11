import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
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