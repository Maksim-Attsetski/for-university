import { FC, useMemo, useState } from 'react';

import { Title, Work, WorkToast } from '../../components';
import { useTypedSelector } from '../../hooks/redux';

import { IWork, workType } from '../../types';
import { getWorkPriceAndTime } from '../../utils';

// import s from './Quiz.module.scss';

const SmallQuiz: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const [total, setTotal] = useState<{ price: number; time: number }>({ price: 0, time: 0 });
  const [workItems, setWorkItems] = useState<{ meter: string; floor: string }>({ floor: '1', meter: '1' });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { excavationWorks, foundationWorks, openingWorks, overlapWorks, roofWorks, wallsWorks } = useMemo(() => {
    const filterByType = (type: workType) => works.filter(work => work.type === type);

    return {
      excavationWorks: filterByType('excavation'),
      foundationWorks: filterByType('foundation'),
      wallsWorks: filterByType('walls'),
      overlapWorks: filterByType('overlap'),
      openingWorks: filterByType('opening'),
      roofWorks: filterByType('roof'),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [works]);

  const selectWorkStatus = (order: number) => {
    setIsVisible(false);

    const intermediateWorks = [...foundationWorks, ...openingWorks, ...overlapWorks, ...wallsWorks]; // between excavation and roof
    const allWorks = [...excavationWorks, ...roofWorks, ...intermediateWorks]; // all works

    const { price: totalPrice, time: totalTime } = getWorkPriceAndTime(allWorks, order, workItems.meter);
    let price = totalPrice;
    let time = totalTime; // price and time for all works

    if (+workItems.floor > 1) {
      const { price: floorPrice, time: floorTime } = getWorkPriceAndTime(intermediateWorks, order, workItems.meter);

      price = price + floorPrice * (+workItems.floor - 1); // total price + price for intermediate works
      time = time + floorTime * (+workItems.floor - 1); // total time + time for intermediate works
    }

    setTotal({ price, time });
    setIsVisible(true);
  };

  const renderWork = (work: IWork, i: number): JSX.Element => (
    <Work
      workItems={workItems}
      setWorkItems={setWorkItems}
      key={work.id}
      work={work}
      renderBtn={i + 1 !== works.length}
      selectWorkStatus={selectWorkStatus}
    />
  );

  return (
    <div className='container content'>
      <br />
      <WorkToast
        data={{ totalPrice: total.price, totalTime: total.time }}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <div className='text-2xl font-bold'>Выберите на какой работе вы остановились</div>
      <br />
      <Title text='Землянные работы' className='my-2 cursor-pointer' />
      {excavationWorks.map((item, i) => renderWork(item, i))}
      <Title text='Фундамент' className='my-2 cursor-pointer' />
      {foundationWorks.map((item, i) => renderWork(item, i))}
      <Title text='Стенки, перегородки' className='my-2 cursor-pointer' />
      {wallsWorks.map((item, i) => renderWork(item, i))}
      <Title text='Перекрытия' className='my-2 cursor-pointer' />
      {overlapWorks.map((item, i) => renderWork(item, i))}
      <Title text='Проёмы' className='my-2 cursor-pointer' />
      {openingWorks.map((item, i) => renderWork(item, i))}
      <Title text='Кровля' className='my-2 cursor-pointer' />
      {roofWorks.map((item, i) => renderWork(item, i))}
    </div>
  );
};
export default SmallQuiz;
