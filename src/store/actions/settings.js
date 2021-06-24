import {SET_LOCALE} from '../constants/actions';
import {LANGUAGES} from '../constants';

export const setLocale = value => dispatch => {
  let text = LANGUAGES[value];
  dispatch({type: SET_LOCALE, payload: {text, value} });
};
