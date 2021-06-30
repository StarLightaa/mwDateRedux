import axios from 'axios';
import {API_URL} from '../store/constants/url';
import {getHeaders} from './AuthHelper';
import {getBaseUrl} from './UrlHelper';
import {showToast} from './ToastHelper';

import {store} from '../store';
import {resetState, resetLoaders} from '../store/actions/auth';

const parseErrorCode = error => {
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch(resetState());
    } else if (error.response.status === 404) {
      const {message} = error.response.data;
      showToast({message});
    }
  } else {
    store.dispatch(resetLoaders());
    showToast({message: 'Ошибка при отправке запроса'});
    console.log('parseErrorCode', error)
  }
  return Promise.reject(error.response);
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async config => {
    const headers = await getHeaders();
    // config.baseURL = 'http://localhost:8000/api/';
    config.baseURL = 'http://friemaxx.beget.tech/api/';
    if (headers) {
      console.log('config.headers', headers);
      config.headers = headers;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
  response => response,
  error => parseErrorCode(error),
);

export default API;
