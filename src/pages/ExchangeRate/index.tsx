import { FC, useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRate: FC = () => {
  const [exchangeRate, setExchangeRate] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');

      setExchangeRate(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {exchangeRate &&
            exchangeRate.map((rate: any) => (
              <div key={rate?.Cur_ID}>
                {rate?.Cur_Name}: {rate?.Cur_OfficialRate} бел. рублей.
                <hr />
                <br />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default ExchangeRate;
