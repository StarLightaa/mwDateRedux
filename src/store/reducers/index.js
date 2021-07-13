import {combineReducers} from 'redux';

import auth from './auth';
import settings from './settings';
import anketa from './anketa';
import photos from './photos';
import anketas from './anketas';
import matches from './matches';

const rootReducer = combineReducers({
  auth,
  settings,
  anketa,
  photos,
  anketas,
  matches,
});

export default (state, action) =>
  action.type === 'USER_LOGOUT'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
