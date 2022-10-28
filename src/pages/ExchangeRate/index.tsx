import { FC, useEffect } from 'react';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/redux';

const ExchangeRate: FC = () => {
  const { exchangeRate } = useTypedSelector(state => state.exchangeRate);
  const { action, getExchangeRate } = useActions();

  const getData = async () => {
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
    <div className='container'>
      <br />
      {exchangeRate &&
        exchangeRate.map((rate: any) => (
          <div key={rate?.Cur_ID}>
            {rate?.Cur_Name}: {rate?.Cur_OfficialRate} бел. рублей.
            <hr />
            <br />
          </div>
        ))}
    </div>
  );
};
export default ExchangeRate;
