import { combineReducers, configureStore } from '@reduxjs/toolkit';
import workReducer from './slices/work';
import authReducer from './slices/auth';
import appReducer from './slices/app';
import exchangeRateReducer from './slices/exchangeRate';
import projectsReducer from './slices/projects';
import quizReducer from './slices/quiz';
import systemsReducer from './slices/systems';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  projects: projectsReducer,
  works: workReducer,
  exchangeRate: exchangeRateReducer,
  quiz: quizReducer,
  systems: systemsReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
