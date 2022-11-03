import { defaultExchangeRate, IExchangeRate } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IState {
  exchangeRate: IExchangeRate[];
}

const initialState: IState = {
  exchangeRate: [],
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRateSlice',
  initialState,
  reducers: {
    setExchangeRate: (state: IState, action: PayloadAction<any[]>) => {
      state.exchangeRate = [...action.payload, defaultExchangeRate];
    },
  },
});

export const getExchangeRate = async (): Promise<IExchangeRate[]> => {
  try {
    const res = await axios('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default exchangeRateSlice.reducer;
export const { setExchangeRate } = exchangeRateSlice.actions;
