import { systems } from './../../data/system';
import { createSlice } from '@reduxjs/toolkit';
import { typeOfSystem } from '../../types';

interface IState {
  systems: typeOfSystem;
  systemKeys: string[];
}

const initialState: IState = {
  systems,
  systemKeys: Object.keys(systems),
};

const systemsSlice = createSlice({
  name: 'systemsSlice',
  initialState,
  reducers: {
    setSystemPrice: (state: IState) => {
      state.systems = JSON.parse(JSON.stringify(state.systems));
    },
  },
});

export default systemsSlice.reducer;
export const { setSystemPrice } = systemsSlice.actions;
