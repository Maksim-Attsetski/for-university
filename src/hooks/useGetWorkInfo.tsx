import { useMemo } from 'react';

import { getWorkPriceAndTime } from '../utils';
import { getCurrentPrice } from '../utils/getCurrentPrice';
import { useTypedSelector } from './redux';
import { useActions } from './useActions';

import { IWorkTotal } from '../types';
import { IProjectInfo } from '../types/project';

interface ICalcFunc {
  (order: number, info?: IProjectInfo | undefined): IWorkTotal;
}

const useGetWorkInfo = (): { calcWorkInfo: ICalcFunc } => {
  const { works, foundationWorks, openingWorks, overlapWorks, wallsWorks } = useTypedSelector(state => state.works);
  const { floor: quizFloor, meter: quizMeter } = useTypedSelector(state => state.quiz);
  const { currency, workCurrency } = useTypedSelector(state => state.exchangeRate);

  const { action } = useActions();
  const intermediateWorks = useMemo(() => [...foundationWorks, ...openingWorks, ...overlapWorks, ...wallsWorks], []); // between excavation and roof

  const calcWorkInfo: ICalcFunc = (order, info) => {
    if (currency) {
      const floor = info ? info.floor : quizFloor;
      const meter = info ? info.meter : quizMeter;

      const { price: totalPrice, time: totalTime } = getWorkPriceAndTime(works, order, '' + meter);
      let price = totalPrice,
        time = totalTime; // price and time for all works

      if (+floor > 1) {
        const { price: floorPrice, time: floorTime } = getWorkPriceAndTime(intermediateWorks, order, '' + meter);

        price = price + floorPrice * (+floor - 1); // total price + price for intermediate works
        time = time + floorTime * (+floor - 1); // total time + time for intermediate works
      }

      const priceWithCurrency: number = currency ? getCurrentPrice(workCurrency, price, currency) : price;
      const total = { price: priceWithCurrency, time };

      action.setTotalProjectInfo(total);
      return total;
    }

    return null;
  };

  return { calcWorkInfo };
};

export default useGetWorkInfo;
