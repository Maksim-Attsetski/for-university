import { FC, useState } from 'react';
import { Work, WorkToast } from '../../components';
import { useTypedSelector } from '../../hooks/redux';
import { IWork } from '../../types';

// import s from './Quiz.module.scss';

const Quiz: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const selectWorkStatus = (order: number) => {
    const futureWorks: IWork[] = works.filter(work => work.order > order);

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
      <br />
      <WorkToast data={{ totalPrice, totalTime }} isVisible={isVisible} setIsVisible={setIsVisible} />
      <hr />
      <br />
      <div className='text-2xl font-bold'>Выберите на какой работе вы остановились</div>
      <br />
      {works.map((work, i) => (
        <Work key={i} work={work} renderBtn={i + 1 !== works.length} selectWorkStatus={selectWorkStatus} />
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
export default Quiz;
