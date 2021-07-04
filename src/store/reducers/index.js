import {combineReducers} from 'redux';

import auth from './auth';
import settings from './settings';

const rootReducer = combineReducers({
  auth,
  settings,
});

export default (state, action) =>
  action.type === 'USER_LOGOUT'
    ? rootReducer({settings: state.settings}, action)
    : rootReducer(state, action);
