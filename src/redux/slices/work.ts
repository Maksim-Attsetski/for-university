import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { works } from '../../data';
import { IExchangeRate, IWork, IWorkTotal, workName, workType } from '../../types';

interface IState {
  works: IWork[];
  excavationWorks: IWork[];
  foundationWorks: IWork[];
  wallsWorks: IWork[];
  overlapWorks: IWork[];
  openingWorks: IWork[];
  roofWorks: IWork[];
  total: IWorkTotal;
}

const initialState: IState = {
  works,
  excavationWorks: [],
  foundationWorks: [],
  openingWorks: [],
  overlapWorks: [],
  roofWorks: [],
  wallsWorks: [],
  total: null,
};

const workSlice = createSlice({
  name: 'workSlice',
  initialState,
  reducers: {
    setWorks: (state: IState) => {
      const filterByType = (type: workType) => state.works.filter(work => work.type === type);

      state.excavationWorks = filterByType('excavation');
      state.foundationWorks = filterByType('foundation');
      state.wallsWorks = filterByType('walls');
      state.overlapWorks = filterByType('overlap');
      state.openingWorks = filterByType('opening');
      state.roofWorks = filterByType('roof');
    },
    setTotalProjectInfo: (state: IState, action: PayloadAction<IWorkTotal>) => {
      state.total = action.payload;
    },
    updateWorkAC: (state: IState, action: PayloadAction<IUpdateWorkAC>) => {
      const { data, workName } = action.payload;
      state.works = [...state.works].map(item => (item.name === workName ? { ...item, ...data } : item));
    },
    updateWorkCurrency: (state: IState, action: PayloadAction<IExchangeRate>) => {
      const currency = action.payload.Cur_Abbreviation;
      state.works = state.works.map(item => ({ ...item, currency }));
    },
  },
});

interface IUpdateWorkAC {
  workName: workName;
  data: IWork;
}

export default workSlice.reducer;

export const { updateWorkAC, updateWorkCurrency, setTotalProjectInfo, setWorks } = workSlice.actions;
