import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import psychologistsReducer from './psychologitsts/psychologistsSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const psychologistsPersistConfig = {
  key: 'filters',
  storage,
  whitelist: ['filters'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  psychologists: persistReducer(psychologistsPersistConfig, psychologistsReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
