import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import userSlice from './user-slice';
import tokenSlice from './token-slice';
import registerSlice from './register-slice';
import snackbarSlice from './snackbar-slice';
import cardSlice from './card-slice';

const reducers = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer,
  register: registerSlice.reducer,
  snackbar: snackbarSlice.reducer,
  card: cardSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'token'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof reducers>;

export default store;
