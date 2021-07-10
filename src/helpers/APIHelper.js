import axios from 'axios';
import * as rax from 'retry-axios';
import {API_URL} from '../store/constants/url';
import {getHeaders} from './AuthHelper';
import {getBaseUrl} from './UrlHelper';
import {showToast} from './ToastHelper';

import {store} from '../store';
import {resetState, resetLoaders} from '../store/actions/auth';

const parseErrorCode = error => {
  if (error.response) {
    switch (error.response.status) {
      case 403:
      case 500:
      case 502:
      case 503:
        showToast({message: error.response.statusText});
        break;

      case 400:
        showToast({message: error.response.data.error});
        break;

      case 401:
        store.dispatch(resetState());
        store.dispatch(resetLoaders());
        break;

      case 404:
        showToast({message: '404 Not found'});
        break;

      default:
        store.dispatch(resetLoaders());
        showToast({message: 'The request ended with an error'});
        break;
    }
  } else if (error.request) {
    store.dispatch(resetLoaders());
    showToast({
      message:
        'The request was sent, but no response was received, please try again',
    });
  } else {
    store.dispatch(resetLoaders());
    showToast({message: 'Unknown error'});
  }
  return Promise.reject(error);
};

const API = axios.create();
API.defaults.raxConfig = {
  retry: 2, // number of retry when facing 4xx or 5xx
  noResponseRetries: 2, // number of retry when facing connection error
  instance: API,
  backoffType: 'exponential',
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.log(`Retry attempt #${cfg.currentRetryAttempt}`); // track current trial
  },
};
rax.attach(API);

// Request parsing interceptor
API.interceptors.request.use(
  async config => {
    const headers = await getHeaders();
    // config.baseURL = 'http://localhost:8000/api/';
    config.baseURL = 'http://friemaxx.beget.tech/api/';
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
  error => parseErrorCode(error),
);

export default API;
