import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './store/reducers'; // the value from combineReducers

const middleware = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// if (__DEV__) {
//   middleware.push(createLogger());
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware, thunk)),
);
const persistor = persistStore(store);

export {store, persistor};
