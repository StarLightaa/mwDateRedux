import axios from 'axios';
import {API_URL} from '../store/constants/url';
import {getHeaders} from './AuthHelper';
import {getBaseUrl} from './UrlHelper';

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async config => {
    const headers = await getHeaders();
    config.baseURL = 'http://127.0.0.1:8000/api/';
    if (headers) {
      config.headers = headers;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
  response => response,
  error => console.log('axios response error:', error),
);

export default API;
