import API from '../../helpers/APIHelper';
import APIHelper from '../../helpers/APIHelper';

import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  SET_AUTH_HEADER,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_AUTH,
  SET_LOCALE,
  SET_ACCOUNT,
  UPDATE_USER,
  UPDATE_ACTIVITY_STATUS,
  UPDATE_ACTIVITY_STATUS_SUCCESS,
  UPDATE_ACTIVITY_STATUS_ERROR,
} from '../constants/actions';

export const doLogin = data => async dispatch => {
  let email = data.email;
  let password = data.password;
  console.log('email', email);
  console.log('password', password);

  try {
    dispatch({type: LOGIN});
    const response = await APIHelper.post('auth/login', {
      email,
      password,
    });
    const {data} = response;
    console.log('login response', data);

    let token = data.access_token;
    let user = data.user;
    console.log('token', token);
    console.log('user', user);
    dispatch({type: LOGIN_SUCCESS, payload: {token, user}});
    // const {name: username, id, account_id} = data;
    // Check user has any account
    //   if (account_id) {
    //     Sentry.setUser({email, username, id});
    //     dispatch({type: SET_AUTH_HEADER, payload: response.headers});
    //     dispatch({type: LOGIN_SUCCESS, payload: data});
    //   } else {
    //     showToast({message: I18n.t('ERRORS.NO_ACCOUNTS_MESSAGE')});
    //     dispatch({type: LOGIN_ERROR, payload: ''});
    //   }
    // } catch (error) {
    //   if (error && error.status === 401) {
    //     showToast({message: I18n.t('ERRORS.AUTH')});
    //   }
    //   dispatch({type: LOGIN_ERROR, payload: error});
  } catch (error) {
    if (error && error.status === 401) {
      // showToast({message: I18n.t('ERRORS.AUTH')});
    }
    console.log('auth error', error);
    dispatch({type: LOGIN_ERROR, payload: error});
  }
};

export const onLogOut = () => async dispatch => {
  dispatch({type: SET_LOCALE, payload: 'en'});
  dispatch({type: USER_LOGOUT});
};
