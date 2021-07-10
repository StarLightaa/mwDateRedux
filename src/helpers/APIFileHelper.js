import axios from 'axios';
import {getHeadersUploadFiles} from './AuthHelper';
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

const APIFILES = axios.create();
APIFILES.defaults.raxConfig = {
  retry: 2, // number of retry when facing 4xx or 5xx
  noResponseRetries: 2, // number of retry when facing connection error
  instance: APIFILES,
  backoffType: 'exponential',
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.log(`Retry attempt #${cfg.currentRetryAttempt}`); // track current trial
  },
};
rax.attach(APIFILES);

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
