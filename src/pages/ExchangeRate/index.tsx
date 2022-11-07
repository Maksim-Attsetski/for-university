import { FC, useEffect } from 'react';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/redux';
import { Button } from '../../components';

const ExchangeRate: FC = () => {
  const { exchangeRate, workCurrency, currency } = useTypedSelector(state => state.exchangeRate);
  const { action, getExchangeRate } = useActions();

  const getData = async () => {
    if (exchangeRate.length > 0) return;

    try {
      action.setIsLoading(true);

      const res = await getExchangeRate();
      action.setExchangeRate(res);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <br />
      <p>Now: {workCurrency.Cur_Abbreviation}</p>
      <br />
      {exchangeRate &&
        exchangeRate.map(rate => (
          <div key={rate?.Cur_ID} className="mt-2">
            <div className="flex justify-between items-center gap-5 flex-wrap">
              <p>
                {rate?.Cur_Name}: {rate?.Cur_OfficialRate} бел. рублей.
              </p>
              <Button
                isSecondary={currency?.Cur_Abbreviation === rate.Cur_Abbreviation}
                text={
                  currency?.Cur_Abbreviation === rate.Cur_Abbreviation ? 'Эта валюта выбрана' : 'Выбрать эту валюту'
                }
                onClick={() => {
                  // action.updateWorkCurrency(rate);
                  action.setNewWorkCurrency(rate);
                }}
              />
            </div>
            <br />
            <hr />
          </div>
        ))}
    </div>
  );
};
export default ExchangeRate;
