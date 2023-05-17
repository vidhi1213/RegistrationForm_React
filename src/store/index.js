import { createStore ,applyMiddleware} from 'redux';
import {persistStore, persistReducer} from "redux-persist";
import rootReducer from './reducers/index';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = function (store) {
    return function (next) {
      return function (action) {
        // your code
        next(action);
      };
    };
  };

export const store = createStore(persistedReducer,applyMiddleware(logger))

export const persistor = persistStore(store);
