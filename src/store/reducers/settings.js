import {SET_LOCALE, RESET_SETTINGS} from '../constants/actions';

const initialState = {
  localeValue: 'en',
  isLocaleSet: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        localeValue: action.payload,
        isLocaleSet: true,
      };
    case RESET_SETTINGS:
      return initialState;

    default:
      return state;
  }
};
