import {SET_LOCALE, RESET_SETTINGS} from '../constants/actions';

import strings from '../../localization/config';
import {DEFAULT_LANGUAGE} from '../../localization/config';
import {LANGUAGES} from '../constants/index';

const initialState = {
  localeValue: strings.getLanguage() ? strings.getLanguage() : DEFAULT_LANGUAGE,
  localeText: LANGUAGES[DEFAULT_LANGUAGE],
  isLocaleSet: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        localeValue: action.payload.value,
        localeText: action.payload.text,
        isLocaleSet: true,
      };
    case RESET_SETTINGS:
      return initialState;

    default:
      return state;
  }
};
