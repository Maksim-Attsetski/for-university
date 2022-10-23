import { useMemo, useState } from 'react';
import { works } from '../../data';
import { IWork } from '../../types';

import './Home.scss';

const Home = (props: any) => {
  const workList: IWork[] = useMemo(() => works, []);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const selectWorkStatus = (order: number) => {
    const futureWorks: IWork[] = workList.filter(work => work.order > order);

    const curPrice: number = futureWorks.reduce((prev, cur) => (prev += cur.price), 0);
    const curTime: number = futureWorks.reduce((prev, cur) => (prev += cur.time), 0);
    setTotalPrice(curPrice);
    setTotalTime(curTime);
  };

  return (
    <div className='container'>
      <div className='content'>
        <h2>hello</h2>
      </div>
      <br />
      <hr />
      <br />
      <div>Выберите на какой работе вы остановились</div>
      <br />
      {workList.map((work, i) => (
        <div key={work._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
          <div>
            <div>
              {work.order}. {work.name}
            </div>
            <div>price: {work.price}</div>
            <div>time: {work.time}</div>
          </div>
          {i + 1 !== workList.length && <button onClick={() => selectWorkStatus(work.order)}>на этой</button>}
        </div>
      ))}
      <br />
      <br />
      <div>
        <h3>Всего будет затрачено: </h3>
        <div>Денег: {totalPrice} $</div>
        <div>Времени: {totalTime} минут</div>
      </div>
    </div>
  );
};
export default Home;
