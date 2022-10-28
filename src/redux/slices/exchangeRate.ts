import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: any[] = [];

const exchangeRateSlice = createSlice({
  name: 'exchangeRateSlice',
  initialState,
  reducers: {
    setExchangeRate: (state: any[], action: PayloadAction<any[]>) => {
      state = action.payload;
    },
  },
});

export const getExchangeRate = async () => {
  try {
    const res = await axios('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default exchangeRateSlice.reducer;
export const { setExchangeRate } = exchangeRateSlice.actions;
