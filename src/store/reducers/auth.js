import {
  RESET_LOADERS,
  CLEAR_VALIDATION,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REFRESH_TOKEN,
  UPDATE_USER,
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

  changePasswordCurrentPasswordError: null,
  changePasswordNewPasswordError: null,
  changePasswordPasswordConfirmError: null,

  sendResetMailError: null,
  resetMail: null,
  resetPasswordToken: null,
  isSendingResetMail: false,
  isChangingPassword: false,

  isLoggedIn: false,
  isEditing: false,
  user: null,
  accessToken: null,
  isResettingPassword: false,
  isUpdating: false,
  error: {},
  success: {},
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case RESET_LOADERS:
      return {
        ...state,
        isRegistering: false,
        isLoggingIn: false,
        isLoggedIn: false,
        isResettingPassword: false,
        isUpdating: false,
        isChangingPassword: false,
        isSendingResetMail: false,
      };
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
        changePasswordCurrentPasswordError: null,
        changePasswordNewPasswordError: null,
        changePasswordPasswordConfirmError: null,
        sendResetMailError: null,
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

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isEditing: false,
        user: action.payload.user,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isEditing: false,
      };

    case CHANGE_PASSWORD:
      return {...state, isChangingPassword: true};

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangingPassword: false,
      };

    case CHANGE_PASSWORD_ERROR:
      let currentPasswordError = null;
      let newPasswordError = null;
      let passwordConfirmError = null;

      let validateChangePasswordErrors = action.payload.data.error;
      console.log('validateChangePasswordErrors', validateChangePasswordErrors);
      if (validateChangePasswordErrors) {
        currentPasswordError = validateChangePasswordErrors.current_password;
        newPasswordError = validateChangePasswordErrors.new_password;
        passwordConfirmError = validateChangePasswordErrors.password_confirm;
      }
      return {
        ...state,
        isChangingPassword: false,
        changePasswordCurrentPasswordError: currentPasswordError,
        changePasswordNewPasswordError: newPasswordError,
        changePasswordPasswordConfirmError: passwordConfirmError,
      };

    case CLEAR_RESET_MAIL:
      return {
        ...state,
        resetMail: null,
        resetPasswordToken: null,
      };

    case SEND_RESET_MAIL:
      return {
        ...state,
        isSendingResetMail: true,
      };

    case SEND_RESET_MAIL_SUCCESS:
      return {
        ...state,
        isSendingResetMail: false,
        resetMail: action.payload.email,
      };

    case SEND_RESET_MAIL_ERROR:
      let resetMailError = null;

      let validateResetMailErrors = action.payload.data.error;
      console.log('validateResetMailErrors', validateResetMailErrors);
      if (validateResetMailErrors) {
        resetMailError = validateResetMailErrors.email;
      }
      return {
        ...state,
        isSendingResetMail: false,
        resetMail: null,
        sendResetMailError: resetMailError,
      };

    case GET_RESET_TOKEN_SUCCESS:
      return {
        ...state,
        resetPasswordToken: action.payload.token,
      };

    case GET_RESET_TOKEN_ERROR:
      return {
        ...state,
        resetPasswordToken: null,
      };

    default:
      return state;
  }
};
