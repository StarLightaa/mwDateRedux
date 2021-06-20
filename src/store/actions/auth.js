import APIHelper from '../../helpers/APIHelper';
import {showToast} from '../../helpers/ToastHelper';

import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REFRESH_TOKEN,
  SET_LOCALE,
} from '../constants/actions';

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
