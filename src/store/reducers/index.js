import {combineReducers} from 'redux';

import auth from './auth';
import settings from './settings';
import anketa from './anketa';
import photos from './photos';

const rootReducer = combineReducers({
  auth,
  settings,
  anketa,
  photos
});

export default (state, action) =>
  action.type === 'USER_LOGOUT'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
