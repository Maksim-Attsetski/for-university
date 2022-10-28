import { FC, useMemo, useState } from 'react';
import { Title, Work, WorkToast } from '../../components';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import { IWork } from '../../types';

// import s from './Quiz.module.scss';

const Quiz: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { action } = useActions();

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

  const { excavationWorks, foundationWorks, openingWorks, overlapWorks, roofWorks, wallsWorks } = useMemo(() => {
    action.setIsLoading(true);

    const excavationWorks = works.filter(work => work.type === 'excavation');
    const foundationWorks = works.filter(work => work.type === 'foundation');
    const wallsWorks = works.filter(work => work.type === 'walls');
    const overlapWorks = works.filter(work => work.type === 'overlap');
    const openingWorks = works.filter(work => work.type === 'opening');
    const roofWorks = works.filter(work => work.type === 'roof');

    action.setIsLoading(false);
    return {
      excavationWorks,
      foundationWorks,
      wallsWorks,
      overlapWorks,
      openingWorks,
      roofWorks,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWork = (work: IWork, i: number) => (
    <Work key={i} work={work} renderBtn={i + 1 !== works.length} selectWorkStatus={selectWorkStatus} />
  );

  return (
    <div className='container content'>
      <br />
      <WorkToast data={{ totalPrice, totalTime }} isVisible={isVisible} setIsVisible={setIsVisible} />
      <hr />
      <br />
      <div className='text-2xl font-bold'>Выберите на какой работе вы остановились</div>
      <br />
      <Title text={'Землянные работы'} className='my-2 cursor-pointer' />
      {excavationWorks.map((item, i) => renderWork(item, i))}
      <Title text={'Фундамент'} className='my-2 cursor-pointer' />
      {foundationWorks.map((item, i) => renderWork(item, i))}
      <Title text={'Стенки, перегородки'} className='my-2 cursor-pointer' />
      {wallsWorks.map((item, i) => renderWork(item, i))}
      <Title text={'Перекрытия'} className='my-2 cursor-pointer' />
      {overlapWorks.map((item, i) => renderWork(item, i))}
      <Title text={'Проёмы'} className='my-2 cursor-pointer' />
      {openingWorks.map((item, i) => renderWork(item, i))}
      <Title text={'Кровля'} className='my-2 cursor-pointer' />
      {roofWorks.map((item, i) => renderWork(item, i))}
    </div>
  );
};
export default Quiz;
