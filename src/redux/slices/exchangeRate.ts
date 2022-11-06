import { defaultExchangeRate, IExchangeRate } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IState {
  exchangeRate: IExchangeRate[];
  currency: IExchangeRate | null;
}

const initialState: IState = {
  exchangeRate: [],
  currency: null,
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRateSlice',
  initialState,
  reducers: {
    setExchangeRate: (state: IState, action: PayloadAction<IExchangeRate[]>) => {
      const allCurrency = [...action.payload, defaultExchangeRate]
      const currency = allCurrency.find((item) => item.Cur_Abbreviation === 'USD') || action.payload[0];
      
      state.exchangeRate = allCurrency;
      state.currency = currency
    },
  },
});

export const getExchangeRate = async (): Promise<IExchangeRate[]> => {
  try {
    const res = await axios('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');
    
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default exchangeRateSlice.reducer;
export const { setExchangeRate } = exchangeRateSlice.actions;
