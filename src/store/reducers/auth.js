import {
  CLEAR_VALIDATION,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REFRESH_TOKEN,
} from '../constants/actions';

export const initialState = {
  isRegistering: false,
  registerFirstnameError: null,
  registerLastNameError: null,
  registerLoginError: null,
  registerNameError: null,
  registerEmailError: null,
  registerPasswordError: null,
  registerPasswordConfirmationError: null,

  isLoggingIn: false,
  loginEmailError: null,
  loginPasswordError: null,

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
    case CLEAR_VALIDATION:
      return {
        ...state,
        registerFirstnameError: null,
        registerLastNameError: null,
        registerLoginError: null,
        registerNameError: null,
        registerEmailError: null,
        registerPasswordError: null,
        registerPasswordConfirmationError: null,
        loginEmailError: null,
        loginPasswordError: null,
      };

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
      let loginEmailError = null;
      let loginPasswordError = null;
      let validateLoginErrors = action.payload.data.error;
      console.log('validateErrors', validateLoginErrors);
      if (validateLoginErrors) {
        loginEmailError = validateLoginErrors.email;
        loginPasswordError = validateLoginErrors.password;
      }
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        user: null,
        accessToken: null,
        error: action.payload,
        success: {},
        loginEmailError: loginEmailError,
        loginPasswordError: loginPasswordError,
      };

    case REGISTER:
      return {...state, isRegistering: true};

    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        error: {},
        success: {},
      };
    case REGISTER_ERROR:
      console.log('payload', action.payload);
      let firstnameError = null;
      let lastnameError = null;
      let loginError = null;
      let nameError = null;
      let emailError = null;
      let password = null;
      let passwordConfirmation = null;

      let validateErrors = action.payload.data.error;
      console.log('validateErrors', validateErrors);
      if (validateErrors) {
        firstnameError = validateErrors.firstname;
        lastnameError = validateErrors.lastname;
        loginError = validateErrors.login;
        nameError = validateErrors.name;
        emailError = validateErrors.email;
        password = validateErrors.password;
      }
      return {
        ...state,
        isRegistering: false,
        registerFirstnameError: firstnameError,
        registerLastNameError: lastnameError,
        registerLoginError: loginError,
        registerNameError: nameError,
        registerEmailError: emailError,
        registerPasswordError: password,
        registerPasswordConfirmationError: null,
        error: action.payload,
        success: {},
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.token,
      };
    default:
      return state;
  }
};
