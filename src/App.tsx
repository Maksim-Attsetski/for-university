import { useMemo, useState } from 'react';
import './App.scss';
import { works } from './data';
import { IWork } from './types';

type totalWork = number | 'Все сделано';

const App = () => {
  // const links: string[] = useMemo(() => ['Home', 'About us', 'Logout'], []);
  const workList: IWork[] = useMemo(() => works, []);
  const [totalPrice, setTotalPrice] = useState<totalWork>(0);
  const [totalTime, setTotalTime] = useState<totalWork>(0);

  const selectWorkStatus = (order: number) => {
    const futureWorks: IWork[] = workList.filter(work => work.order > order);

    const curPrice: number = futureWorks.reduce((prev, cur) => (prev += cur.price), 0);
    const curTime: number = futureWorks.reduce((prev, cur) => (prev += cur.time), 0);
    setTotalPrice(curPrice === 0 ? 'Все сделано' : curPrice);
    setTotalTime(curTime === 0 ? 'Все сделано' : curTime);
  };

  return (
    <div className='container'>
      {/* <NavBar links={links} title='custom menu' /> */}
      <div className='content'>
        <h2>hello</h2>
      </div>
      <br />
      <hr />
      <br />
      <div>Выберите на какой работе вы остановились</div>
      <br />
      {workList.map(work => (
        <div key={work._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
          <div>
            <div>
              {work.order}. {work.name}
            </div>
            <div>price: {work.price}</div>
            <div>time: {work.time}</div>
          </div>
          <button onClick={() => selectWorkStatus(work.order)}>на этой</button>
        </div>
      ))}
      <br />
      <br />
      {totalPrice === 'Все сделано' ? (
        <div>
          <h3>Работы выполнены</h3>
        </div>
      ) : (
        <div>
          <h3>Всего будет затрачено: </h3>
          <div>Денег: {totalPrice} $</div>
          <div>Времени: {totalTime} минут</div>
        </div>
      )}
    </div>
  );
};
export default App;
