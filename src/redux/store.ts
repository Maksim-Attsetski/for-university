import { combineReducers, configureStore } from '@reduxjs/toolkit';
import workReducer from './slices/work';
import authReducer from './slices/auth';
import appReducer from './slices/app';
import exchangeRateReducer from './slices/exchangeRate';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  works: workReducer,
  exchangeRate: exchangeRateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
