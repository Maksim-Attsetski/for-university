import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { works } from '../../data';
import { IExchangeRate, IWork, workName } from '../../types';

interface IState {
  works: IWork[];
}

const initialState: IState = {
  works,
};

const workSlice = createSlice({
  name: 'workSlice',
  initialState,
  reducers: {
    updateWorkAC: (state: IState, action: PayloadAction<IUpdateWorkAC>) => {
      const { data, workName } = action.payload;
      state.works = [...state.works].map(item => (item.name === workName ? { ...item, ...data } : item));
    },
    updateWorkCurrency: (state: IState, action: PayloadAction<IExchangeRate>) => {
      const currency = action.payload.Cur_Abbreviation;
      state.works = state.works.map((item => ({ ...item, currency })));
    },
  },
});

interface IUpdateWorkAC {
  workName: workName;
  data: IWork;
}

export default workSlice.reducer;

export const { updateWorkAC, updateWorkCurrency } = workSlice.actions;
