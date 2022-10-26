import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface IState {
  auth: boolean;
  currentUser: User | null;
}

const initialState: IState = {
  auth: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state: IState, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    setUser: (state: IState, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
  },
});

export default authSlice.reducer;

export const { setAuth, setUser } = authSlice.actions;
