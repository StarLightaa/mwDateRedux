import APIHelper from '../../helpers/APIHelper';
import {showToast} from '../../helpers/ToastHelper';

import {
  RESET_LOADERS,
  CLEAR_VALIDATION,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REFRESH_TOKEN,
  SET_LOCALE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../constants/actions';

export const resetLoaders = () => dispatch => {
  dispatch({type: RESET_LOADERS});
};

export const clearValidation = () => dispatch => {
  dispatch({type: CLEAR_VALIDATION});
};

export const doRegister = credentials => async dispatch => {
  console.log('credentials', credentials);
  let cred = credentials;
  try {
    dispatch({type: REGISTER});
    const response = await APIHelper.post('auth/register', cred);
    const {data} = response;
    showToast({
      message:
        'Поздравляем, вы успешно зарегистрировались! Пожалуйста авторизируйтесь',
    });
    dispatch({type: REGISTER_SUCCESS});
    return true;
  } catch (error) {
    if (error && error.status === 401) {
      showToast({message: 'Ошибка регистрации 401'});
      // showToast({message: I18n.t('ERRORS.AUTH')});
    }
    showToast({message: 'Ошибка регистрации ' + error.status});
    console.log('doRegister error', error);
    dispatch({type: REGISTER_ERROR, payload: error});
    return false;
  }
};

export const doLogin = credentials => async dispatch => {
  let cred = credentials;
  console.log('credentials', cred);
  try {
    dispatch({type: LOGIN});
    const response = await APIHelper.post('auth/login', cred);
    const {data} = response.data;
    console.log('login response', data);

    let token = data.token;
    let user = data.user;
    console.log('token', token);
    console.log('user', user);
    dispatch({type: LOGIN_SUCCESS, payload: {token, user}});
    return true;
  } catch (error) {
    if (error && error.status === 401) {
      // showToast({message: I18n.t('ERRORS.AUTH')});
      showToast({message: 'Неверный логин или пароль' + error.status});
      dispatch({type: LOGIN_ERROR, payload: error});
      return false;
    }
    showToast({message: 'Ошибка авторизации ' + error.status});
    console.log('doLogin error', error);
    dispatch({type: LOGIN_ERROR, payload: error});
    return false;
  }
};

export const onLogOut = () => async dispatch => {
  await APIHelper.post('auth/logout');
  dispatch({type: USER_LOGOUT});
};

export const resetState = () => dispatch => {
  console.log('resetState');
  // dispatch({type: SET_LOCALE, payload: 'en'});
  dispatch({type: USER_LOGOUT});
};

export const userProfile = () => async dispatch => {
  try {
    const response = await APIHelper.get('auth/me');
    const {data} = response.data;
    console.log('user-profile response', data);

    let user = data.user;
    console.log('user', user);
    showToast({message: 'user-profile Почта пользователя' + user.email});
    return true;
  } catch (error) {
    if (error && error.status === 401) {
      showToast({message: 'user-profile Ошибка токена' + error.status});
      console.log('user-profile', error);
      return false;
    }
    showToast({message: 'user-profile Ошибка авторизации' + error.status});
    console.log('doLogin error', error);
    return false;
  }
};

export const updateUser = (credentials) => async dispatch => {
  try {
    const response = await APIHelper.put(`user`, credentials);
    const {data} = response.data;

    let user = data.user;
    showToast({message: 'user-profile Почта пользователя' + user.email});
    dispatch({type: UPDATE_USER_SUCCESS, payload: {user}});
    return true;
  } catch (error) {
    showToast({message: 'user-update Ошибка обновления' + error.status});
    dispatch({type: UPDATE_USER_ERROR, payload: error});
    return false;
  }
};

export const updatePassword = credentials => async dispatch => {
  console.log('credentials', credentials);
  try {
    dispatch({type: CHANGE_PASSWORD});
    const response = await APIHelper.post(
      'auth/reset-password/by-old-password',
      credentials,
    );

    showToast({message: 'Пароль изменен успешно'});
    dispatch({type: CHANGE_PASSWORD_SUCCESS});
    return true;
  } catch (error) {
    showToast({message: 'Ошибка смены пароля' + error.status});
    dispatch({type: CHANGE_PASSWORD_ERROR, payload: error});
    return false;
  }
};
