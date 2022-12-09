import React, { useMemo } from 'react';
import { getWorkPriceAndTime } from '../utils';
import { useTypedSelector } from './redux';
import { useActions } from './useActions';

const useGetWorkInfo = (workOrder: number = 1) => {
  const { works } = useTypedSelector(state => state.works);
  const { exchangeRate, currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const { action } = useActions();

  return <div>useGetWorkInfo</div>;
};

export default useGetWorkInfo;
