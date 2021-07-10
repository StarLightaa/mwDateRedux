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
  SEND_RESET_MAIL,
  SEND_RESET_MAIL_SUCCESS,
  SEND_RESET_MAIL_ERROR,
  GET_RESET_TOKEN_SUCCESS,
  GET_RESET_TOKEN_ERROR,
  CLEAR_RESET_MAIL,
} from '../constants/actions';

export const resetLoaders = () => dispatch => {
  dispatch({type: RESET_LOADERS});
};

export const clearValidation = () => dispatch => {
  dispatch({type: CLEAR_VALIDATION});
};

export const doRegister = credentials => async dispatch => {
  try {
    dispatch({type: REGISTER});
    const response = await APIHelper.post('auth/register', credentials);
    const {data} = response;
    showToast({
      message:
        'Поздравляем, вы успешно зарегистрировались! Пожалуйста авторизируйтесь',
    });
    dispatch({type: REGISTER_SUCCESS});
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({type: REGISTER_ERROR, payload: error.response});
      return false;
    }
    return false;
  }
};

export const doLogin = credentials => async dispatch => {
  try {
    dispatch({type: LOGIN});
    const response = await APIHelper.post('auth/login', credentials);
    const {data} = response.data;
    console.log('login response', data);

    let token = data.token;
    let user = data.user;
    dispatch({type: LOGIN_SUCCESS, payload: {token, user}});
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({type: LOGIN_ERROR, payload: error.response});
      return false;
    }
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

export const updateUser = credentials => async dispatch => {
  try {
    const response = await APIHelper.put(`user`, credentials);
    const {data} = response.data;

    let user = data.user;
    showToast({message: 'user-update' + user.email});
    dispatch({type: UPDATE_USER_SUCCESS, payload: {user}});
    return true;
  } catch (error) {
    showToast({message: 'user-update Ошибка обновления' + error.status});
    dispatch({type: UPDATE_USER_ERROR, payload: error});
    return false;
  }
};

export const updatePassword = credentials => async dispatch => {
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

export const updatePasswordByEmail = credentials => async dispatch => {
  console.log('credentials', credentials);
  try {
    dispatch({type: CHANGE_PASSWORD});
    const response = await APIHelper.post(
      'auth/reset-password/by-email',
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

export const sendResetMail = credentials => async dispatch => {
  console.log('credentials', credentials);
  try {
    dispatch({type: SEND_RESET_MAIL});
    const response = await APIHelper.post('auth/forgot-password', credentials);
    console.log('resp', response);
    const {data} = response.data;
    let email = data.email;
    dispatch({type: SEND_RESET_MAIL_SUCCESS, payload: {email}});
    return true;
  } catch (error) {
    showToast({message: 'Ошибка отправки письма' + error.status});
    console.log('err', error);
    dispatch({type: SEND_RESET_MAIL_ERROR, payload: error});
    return false;
  }
};

export const clearResetMail = email => async dispatch => {
  try {
    const response = await APIHelper.post('auth/clear-mail', {
      email: email,
    });
    dispatch({type: CLEAR_RESET_MAIL});
    return true;
  } catch (error) {
    console.log('err', error);
    return false;
  }
};

export const tryGetResetPasswordToken = email => async dispatch => {
  console.log('email', email);
  try {
    const response = await APIHelper.post('auth/get-reset-token', {
      email: email,
    });
    console.log('resp', response);
    const {data} = response.data;
    let token = data.reset_token;
    dispatch({type: GET_RESET_TOKEN_SUCCESS, payload: {token}});
    return true;
  } catch (error) {
    // showToast({message: 'Ошибка отправки письма' + error.status});
    console.log('err', error);
    dispatch({type: GET_RESET_TOKEN_ERROR});
    return false;
  }
};
