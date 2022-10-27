import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isLoading: boolean;
  appLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
  appLoading: true,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsLoading: (state: IState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppLoading: (state: IState, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setAppLoading, setIsLoading } = appSlice.actions;
