import {SET_LOCALE, RESET_SETTINGS} from '../constants/actions';

import strings from '../../localization/config';


const initialState = {
  localeValue: strings.getLanguage() ? strings.getLanguage() : 'en',
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
