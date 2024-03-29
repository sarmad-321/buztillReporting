import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import generalSlice from './slices/generalSlice';
import printerSlice from './slices/printerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['commonReducer'],
};
const reducers = combineReducers({
  user: userSlice,
  general: generalSlice,
  printer: printerSlice,
});
const persistedStore = persistReducer(persistedConfig, reducers);

const store = configureStore({
  reducer: persistedStore,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export {store, persistor};
