import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/crm',
});

instance.interceptors.request.use((config) => {
  config.params = {
    //default params
    company_id: localStorage.getItem('company_id'),
    // spread the request's params
    ...config.params,
  };
  return config;
});

export default instance;
