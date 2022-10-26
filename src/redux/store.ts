import { combineReducers, configureStore } from '@reduxjs/toolkit';
import workReducer from './slices/work';

const rootReducer = combineReducers({
  works: workReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
