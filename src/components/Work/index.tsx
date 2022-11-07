import { FC, useMemo, useState } from 'react';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/redux';
import { IWork } from '../../types';
import { getCurrentPrice } from '../../utils/getCurrentPrice';

import { Popup, Button, Title, Input } from '../';

import s from './Work.module.scss';
import { getErrorMsg } from '../../utils';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  selectWorkStatus: (order: number) => void;
  workClass?: string;
  workItems: { meter: string; floor: string };
  setWorkItems: (val: { meter: string; floor: string }) => void;
  setError: (val: string | null) => void;
}

const Work: FC<IProps> = ({
  work,
  renderBtn,
  selectWorkStatus,
  workClass = '',
  workItems = { floor: '1', meter: '1' },
  setWorkItems = () => {},
  setError = () => {},
}) => {
  const [activeWork, setActiveWork] = useState<IWork>(work);
  const { exchangeRate, currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const { action } = useActions();

  const onChangeActiveWork = (currentWork: IWork) => {
    setActiveWork(currentWork);
    const data: IWork = { ...work, activeWork: currentWork };
    action.updateWorkAC({ data, workName: work.name });
  };

  const onConfirmWork = (order: number): boolean => {
    const isValidFloor: boolean = !(+workItems.floor > 3 || +workItems.floor === 0);
    const isValidMeters: boolean = !(+workItems.meter < 1 || +workItems.meter > 1000);
    const isValid = isValidFloor && isValidMeters;

    !isValidFloor && setError(getErrorMsg('invalid floor'));
    !isValidMeters && setError(getErrorMsg('invalid meters'));

    isValid && selectWorkStatus(order);
    return isValid;
  };

  const currentPrice: number = useMemo(
    () => (!currency ? activeWork.price : getCurrentPrice(workCurrency, activeWork.price, currency)),
    [currency, activeWork, exchangeRate],
  );

  return (
    <div className={s.workCollapse + ' ' + workClass}>
      {work.worksToChoose ? (
        <div>
          <Title text={activeWork.order + '. ' + activeWork.name} />
          <div>
            Стоимость: {currentPrice} {currency?.Cur_Abbreviation || ''}
          </div>
          <div>Длительность: {activeWork.time} мин.</div>
          <div>
            <br />
            <Title text={'Выберите работу:'} />
            {[work, ...work.worksToChoose].map(item => (
              <div
                key={item.name}
                className={item.name === activeWork.name ? s.active : '' + ' ' + s.work}
                onClick={() => onChangeActiveWork(item)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Title text={`${work.order}. ${work.name}`} />
          <div>
            Стоимость: {currentPrice} {currency?.Cur_Abbreviation || ''}
          </div>
          <div>Длительность: {work.time} мин.</div>
        </div>
      )}
      {renderBtn && (
        <Popup
          buttonText="на этой"
          renderBody={setIsShow => (
            <>
              <div className={s.popup}>
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
              <Button
                onClick={() => {
                  if (onConfirmWork(work.order)) {
                    setIsShow(false);
                  }
                }}
                className={s.popupButton}
                text="Подтвердить"
              />
            </>
          )}
        />
      )}
    </div>
  );
};

export default Work;
