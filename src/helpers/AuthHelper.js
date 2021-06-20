import {store} from '../store';

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Language': state.settings.localeValue ? state.settings.localeValue : 'en',
      Authorization: 'Bearer ' + state.auth.accessToken,
    };
  } catch (error) {}
};
