import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface IState {
  isAuth: boolean;
  currentUser: User | null;
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
    setUser: (state: IState, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    updateUserData: (state: IState, action: PayloadAction<User>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export default authSlice.reducer;

export const { setAuth, setUser, updateUserData } = authSlice.actions;
