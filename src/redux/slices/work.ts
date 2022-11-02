import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { works } from '../../data';
import { IWork, workName } from '../../types';

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
    currencyUpdate: (state: IState, action: PayloadAction<number>) => {
      // TODO
      state.works = [];
    },
  },
});

interface IUpdateWorkAC {
  workName: workName;
  data: IWork;
}

export default workSlice.reducer;

export const { updateWorkAC } = workSlice.actions;
