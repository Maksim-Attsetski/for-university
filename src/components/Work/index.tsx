import { FC, useMemo, useState } from 'react';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/redux';
import { IWork } from '../../types';
import { getCurrentPrice } from '../../utils/getCurrentPrice';

import { Button, Title } from '../';

import s from './Work.module.scss';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  workClass?: string;
  onConfirmWork: (val: number) => boolean;
}

const Work: FC<IProps> = ({ work, renderBtn, workClass = '', onConfirmWork = () => {} }) => {
  const [activeWork, setActiveWork] = useState<IWork>(work);
  const { exchangeRate, currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const { action } = useActions();

  const onChangeActiveWork = (currentWork: IWork) => {
    setActiveWork(currentWork);
    const data: IWork = { ...work, activeWork: currentWork };
    action.updateWorkAC({ data, workName: work.name });
  };

  const currentPrice: number = useMemo(
    () => (!currency ? activeWork.price : getCurrentPrice(workCurrency, activeWork.price, currency)),
    [currency, activeWork, exchangeRate],
  );

  return (
    <>
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
                  className={[s.work, item.name === activeWork.name ? s.active : ''].join(' ')}
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
          <Button className={s.confirmButton} text="На этой" onClick={() => onConfirmWork(activeWork.order)} />
        )}
      </div>
    </>
  );
};

export default Work;
