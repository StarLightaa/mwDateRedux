import axios from 'axios';
import {getHeadersUploadFiles} from './AuthHelper';
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

const APIFILES = axios.create();

// Request parsing interceptor
APIFILES.interceptors.request.use(
  async config => {
    const headers = await getHeadersUploadFiles();
    config.baseURL = 'http://friemaxx.beget.tech/api/';
    if (headers) {
      config.headers = headers;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response parsing interceptor
APIFILES.interceptors.response.use(
  response => response,
  error => parseErrorCode(error),
);

export default APIFILES;
