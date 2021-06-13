import {store} from '../store';

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + state.auth.accessToken,
    };
  } catch (error) {}
};
