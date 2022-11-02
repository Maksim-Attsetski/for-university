import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types';

interface IState {
  isAuth: boolean;
  currentUser: IUser | null;
}

const initialState: IState = {
  isAuth: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state: IState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state: IState, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
    updateUserData: (state: IState, action: PayloadAction<IUser>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export default authSlice.reducer;

export const { setAuth, setUser, updateUserData } = authSlice.actions;
