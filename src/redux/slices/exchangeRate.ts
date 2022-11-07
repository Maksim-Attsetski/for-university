import { Cur_AbbreviationType, defaultExchangeRate, IExchangeRate,  } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IState {
  exchangeRate: IExchangeRate[];
  currency: IExchangeRate | null;
  defaultCurrency: Cur_AbbreviationType;
  workCurrency: IExchangeRate;
}

const initialState: IState = {
  exchangeRate: [],
  currency: null,
  defaultCurrency: 'USD',
  workCurrency: defaultExchangeRate,
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRateSlice',
  initialState,
  reducers: {
    setExchangeRate: (state: IState, action: PayloadAction<IExchangeRate[]>) => {
      const allCurrency = [...action.payload, state.workCurrency]
      const currency = allCurrency.find((item) => item.Cur_Abbreviation === state.defaultCurrency)
       || state.workCurrency;

      state.exchangeRate = allCurrency;
      state.currency = currency
    },
    setNewWorkCurrency: (state: IState, action: PayloadAction<IExchangeRate>) => {
      state.currency = action.payload;
    }
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
export const { setExchangeRate, setNewWorkCurrency } = exchangeRateSlice.actions;
