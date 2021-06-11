import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_AUTH_HEADER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_AUTH,
  SET_ACCOUNT,
  UPDATE_USER,
  UPDATE_ACTIVITY_STATUS,
  UPDATE_ACTIVITY_STATUS_SUCCESS,
  UPDATE_ACTIVITY_STATUS_ERROR,
} from '../constants/actions';

export const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  user: null,
  accessToken: null,
  isResettingPassword: false,
  isUpdating: true,
  error: {},
  success: {},
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case LOGIN:
      return {...state, isLoggingIn: true};

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: action.payload.user,
        accessToken: action.payload.token,
        error: {},
        success: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        user: null,
        accessToken: null,
        error: action.payload,
        success: {},
      };
    default:
      return state;
  }
};
