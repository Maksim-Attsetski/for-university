import { FC, useMemo, useState } from 'react';
import { Popup, Title, Work, WorkToast } from '../../components';
import { useTypedSelector } from '../../hooks/redux';
import { IWork } from '../../types';

// import s from './Quiz.module.scss';

const SmallQuiz: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const [total, setTotal] = useState<{ price: number; time: number }>({ price: 0, time: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const selectWorkStatus = (order: number) => {
    const futureWorks: IWork[] = works.filter(work => work.order > order);

    const price: number = futureWorks.reduce(
      (prev, cur) => (prev += cur.activeWork ? cur.activeWork.price : cur.price),
      0
    );
    const time: number = futureWorks.reduce(
      (prev, cur) => (prev += cur.activeWork ? cur.activeWork.time : cur.time),
      0
    );
    setTotal({ price, time });
    setIsVisible(true);
  };

  const { excavationWorks, foundationWorks, openingWorks, overlapWorks, roofWorks, wallsWorks } = useMemo(
    () => ({
      excavationWorks: works.filter(work => work.type === 'excavation'),
      foundationWorks: works.filter(work => work.type === 'foundation'),
      wallsWorks: works.filter(work => work.type === 'walls'),
      overlapWorks: works.filter(work => work.type === 'overlap'),
      openingWorks: works.filter(work => work.type === 'opening'),
      roofWorks: works.filter(work => work.type === 'roof'),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [works]
  );

  const renderWork = (work: IWork, i: number) => (
    <Work key={work.id} work={work} renderBtn={i + 1 !== works.length} selectWorkStatus={selectWorkStatus} />
  );

  return (
    <div className='container content'>
      <br />
      <Popup>
        <p>привет</p>
      </Popup>
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
