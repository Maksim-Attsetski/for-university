import { useMemo, useState } from 'react';
import { WorkToast, Work } from '../../components';
import { works } from '../../data';
import { IWork } from '../../types';

import './Home.scss';

const Home = () => {
  const workList: IWork[] = useMemo(() => works, []);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const selectWorkStatus = (order: number) => {
    const futureWorks: IWork[] = workList.filter(work => work.order > order);

    const curPrice: number = futureWorks.reduce(
      (prev, cur) => (prev += cur.activeWork ? cur.activeWork.price : cur.price),
      0
    );
    const curTime: number = futureWorks.reduce(
      (prev, cur) => (prev += cur.activeWork ? cur.activeWork.time : cur.time),
      0
    );
    setTotalPrice(curPrice);
    setTotalTime(curTime);
    setIsVisible(true);
  };

  return (
    <div className='container content'>
      <div>
        <h2>hello</h2>
      </div>
      <br />
      <WorkToast data={{ totalPrice, totalTime }} isVisible={isVisible} setIsVisible={setIsVisible} />
      <hr />
      <br />
      <div className='text-2xl font-bold'>Выберите на какой работе вы остановились</div>
      <br />
      {workList.map((work, i) => (
        <Work key={i} work={work} renderBtn={i + 1 !== workList.length} selectWorkStatus={selectWorkStatus} />
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
