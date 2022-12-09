import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Toast, Work, WorkCollapse, WorkToast } from '../../components';
import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { IWork } from '../../types';
import { IProjectInfo } from '../../types/project';
import { getErrorMsg } from '../../utils';

// import s from './Quiz.module.scss';

const SmallQuiz: FC = () => {
  const { works, excavationWorks, foundationWorks, openingWorks, overlapWorks, roofWorks, wallsWorks, total } =
    useTypedSelector(state => state.works);
  const { currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const [workItems, setWorkItems] = useState<IProjectInfo>({ floor: '1', meter: '1' });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { action } = useActions();
  const selectWorkStatus = (order: number) => {
    setIsVisible(false);
    if (!currency) {
      return;
    }

    action.calcTotalProjectInfo({
      currency,
      workCurrency,
      order,
      info: workItems,
    });

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
      <WorkToast data={total} isVisible={isVisible} setIsVisible={setIsVisible} />
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
