import React, { FC, useMemo, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { IExchangeRate, IWork } from '../../types';
import { Popup, Button, Title, Input } from '../';
import { useTypedSelector } from '../../hooks/redux';
import { getCurrentPrice } from '../../utils/getCurrentPrice';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  selectWorkStatus: (order: number) => void;
  workClass?: string;
  workItems: { meter: string; floor: string };
  setWorkItems: (val: { meter: string; floor: string }) => void;
}

const Work: FC<IProps> = ({
  work,
  renderBtn,
  selectWorkStatus,
  workClass = '',
  workItems = { floor: '1', meter: '1' }, 
  setWorkItems = () => {},
}) => {
  const [activeWork, setActiveWork] = useState<IWork>(work);
  const { exchangeRate } = useTypedSelector(state => state.exchangeRate);
  const { action } = useActions();
  
  // TODO in custom state
  const currency: IExchangeRate | undefined = useMemo(() => {
    return exchangeRate.filter((item) => item.Cur_Abbreviation === 'EUR')[0];
  }, [exchangeRate]);

  const onChangeActiveWork = (currentWork: IWork) => {
    setActiveWork(currentWork);
    const data: IWork = { ...work, activeWork: currentWork };
    action.updateWorkAC({ data, workName: work.name });
  };

  const onConfirmWork = (order: number): boolean => {
    if (+workItems.floor > 3 || +workItems.floor === 0 || +workItems.meter < 1 || +workItems.meter > 1000) return false;

    selectWorkStatus(order);
    return true;
  };

  const activeClassName = useMemo(() => 'bg-slate-600 text-white p-1 rounded-lg max-w-[75%]', []);
  const className = useMemo(() => 'p-1 mb-2 transition-all rounded-lg max-w-[75%]', []);

  const currentPrice: number = useMemo(() => {
    if (!currency) return activeWork.price;
    // REFACTOR
    const workCurrency: IExchangeRate = exchangeRate.filter((item) => item.Cur_Abbreviation === activeWork.currency)[0];
    
    return getCurrentPrice(workCurrency, activeWork.price, currency)
  }, [currency, activeWork])

  return (
    <div className={'flex justify-between m-4 bg-white px-8 py-3 rounded-xl ' + workClass}>
      {work.worksToChoose ? (
        <div>
          <Title text={activeWork.order + '. ' + activeWork.name} />
          <div>Стоимость: {currentPrice} {activeWork.currency}</div>
          <div>Длительность: {activeWork.time} мин.</div>
          <div>
            <br />
            <Title text={'Выберите работу:'} />
            {[work, ...work.worksToChoose].map(item => (
              <div
                key={item.name}
                className={item.name === activeWork.name ? activeClassName : className}
                onClick={() => onChangeActiveWork(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Title text={`${work.order}. ${work.name}`} />
          <div>Стоимость: {currentPrice} {activeWork.currency}</div>
          <div>Длительность: {work.time} мин.</div>
        </div>
      )}
      {renderBtn && (
        <Popup
          buttonText='на этой'
          renderBody={setIsShow => (
            <>
              <div className='flex flex-col gap-y-4'>
                <Input
                  max={1500}
                  type='number'
                  placeholder='Кв. метры'
                  text={workItems.meter}
                  setText={meter => setWorkItems({ ...workItems, meter })}
                />
                <Input
                  max={3}
                  type='number'
                  placeholder='Этаж'
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
                className={'h-max w-max self-center'}
                text='Подтвердить'
              />
            </>
          )}
        />
      )}
    </div>
  );
};

export default Work;
