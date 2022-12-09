import { IProjectInfo } from './../../types/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { works } from '../../data';
import { IExchangeRate, IWork, IWorkTotal, workName, workType } from '../../types';
import { getWorkPriceAndTime } from '../../utils';
import { getCurrentPrice } from '../../utils/getCurrentPrice';

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
    calcTotalProjectInfo: (
      state: IState,
      action: PayloadAction<{
        info: IProjectInfo;
        workCurrency: IExchangeRate;
        order: number;
        currency: IExchangeRate;
      }>,
    ) => {
      const intermediateWorks = [
        ...state.foundationWorks,
        ...state.openingWorks,
        ...state.overlapWorks,
        ...state.wallsWorks,
      ]; // between excavation and roof
      const allWorks = [...state.excavationWorks, ...state.roofWorks, ...intermediateWorks]; // all works

      const { currency, info, workCurrency, order } = action.payload;

      const { price: totalPrice, time: totalTime } = getWorkPriceAndTime(allWorks, order, info.meter);
      let price = totalPrice;
      let time = totalTime; // price and time for all works

      if (+info.floor > 1) {
        const { price: floorPrice, time: floorTime } = getWorkPriceAndTime(intermediateWorks, order, info.meter);

        price = price + floorPrice * (+info.floor - 1); // total price + price for intermediate works
        time = time + floorTime * (+info.floor - 1); // total time + time for intermediate works
      }

      const priceWithCurrency: number = currency ? getCurrentPrice(workCurrency, price, currency) : price;

      state.total = { price: priceWithCurrency, time };
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

export const { updateWorkAC, updateWorkCurrency, calcTotalProjectInfo, setWorks } = workSlice.actions;
