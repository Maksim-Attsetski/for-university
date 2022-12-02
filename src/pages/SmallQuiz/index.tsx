import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Toast, Work, WorkCollapse, WorkToast } from '../../components';
import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';

import { IWork, workType } from '../../types';
import { getErrorMsg, getWorkPriceAndTime } from '../../utils';
import { getCurrentPrice } from '../../utils/getCurrentPrice';

// import s from './Quiz.module.scss';

const SmallQuiz: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const { currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const [total, setTotal] = useState<{ price: number; time: number }>({ price: 0, time: 0 });
  const [workItems, setWorkItems] = useState<{ meter: string; floor: string }>({
    floor: '1',
    meter: '1',
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { excavationWorks, foundationWorks, openingWorks, overlapWorks, roofWorks, wallsWorks } = useMemo(() => {
    const filterByType = (type: workType) => works.filter(work => work.type === type);

    return {
      excavationWorks: filterByType('excavation'),
      foundationWorks: filterByType('foundation'),
      wallsWorks: filterByType('walls'),
      overlapWorks: filterByType('overlap'),
      openingWorks: filterByType('opening'),
      roofWorks: filterByType('roof'),
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

    const priceWithCurrency: number = currency ? getCurrentPrice(workCurrency, price, currency) : price;

    setTotal({ price: priceWithCurrency, time });
    setIsVisible(true);
  };

  const renderWork = (work: IWork, i: number): JSX.Element => (
    <Work key={work.id} work={work} renderBtn={i + 1 !== works.length} onConfirmWork={onConfirmWork} />
  );

  const onConfirmWork = (order: number): boolean => {
    const isValidFloor: boolean = !(+workItems.floor > 3 || +workItems.floor === 0);
    const isValidMeters: boolean = !(+workItems.meter < 1 || +workItems.meter > 1000);
    const isValid = isValidFloor && isValidMeters;

    !isValidFloor && setError(getErrorMsg('invalid floor'));
    !isValidMeters && setError(getErrorMsg('invalid meters'));

    isValid && selectWorkStatus(order);
    return isValid;
  };

  return (
    <div className="container content">
      <br />
      <WorkToast
        data={{ totalPrice: total.price, totalTime: total.time }}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Toast data={error} setData={setError} isError />
      <div className="flex gap-5 flex-wrap">
        <Button text="Назад" onClick={() => navigate(routes.quiz)} />
        <Input
          max={1500}
          type="number"
          placeholder="Кв. метры"
          text={workItems.meter}
          setText={meter => setWorkItems({ ...workItems, meter })}
        />
        <Input
          max={3}
          type="number"
          placeholder="Этаж"
          text={workItems.floor}
          setText={floor => setWorkItems({ ...workItems, floor })}
        />
      </div>
      <br />
      <div className="text-2xl font-bold">Выберите на какой работе вы остановились</div>
      <br />
      <WorkCollapse title="Землянные работы" data={excavationWorks} renderWork={renderWork} />
      <WorkCollapse title="Фундамент" data={foundationWorks} renderWork={renderWork} />
      <WorkCollapse title="Стенки, перегородки" data={wallsWorks} renderWork={renderWork} />
      <WorkCollapse title="Перекрытия" data={overlapWorks} renderWork={renderWork} />
      <WorkCollapse title="Проёмы" data={openingWorks} renderWork={renderWork} />
      <WorkCollapse title="Кровля" data={roofWorks} renderWork={renderWork} />
    </div>
  );
};
export default SmallQuiz;
