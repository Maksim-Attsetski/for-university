import React, { FC, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { IWork } from '../../types';
import { Button, Title } from '../';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  selectWorkStatus: (order: number) => void;
  workClass?: string;
}

const Work: FC<IProps> = ({ work, renderBtn, selectWorkStatus, workClass = '' }) => {
  const [activeWork, setActiveWork] = useState<IWork>(work);
  const { action } = useActions();

  const onChangeActiveWork = (currentWork: IWork) => {
    setActiveWork(currentWork);
    const data: IWork = { ...work, activeWork: currentWork };
    action.updateWorkAC({ data, workName: work.name });
  };
  const activeClassName = 'bg-slate-600 text-white p-1 rounded-lg max-w-[75%]';
  const className = 'p-1 mb-2 transition-all rounded-lg max-w-[75%]';
  return (
    <div className={'flex justify-between m-4 bg-white px-8 py-3 rounded-xl ' + workClass}>
      {work.worksToChoose ? (
        <div>
          <Title text={activeWork.order + '. ' + activeWork.name} />
          <div>Стоимость: {activeWork.price}$</div>
          <div>Длительность: {activeWork.time} мин.</div>
          <div>
            <br />
            <Title text={'Выберите работу:'} />
            <div
              className={work.name === activeWork.name ? activeClassName : className}
              onClick={() => onChangeActiveWork(work)}
            >
              {work.name}
            </div>
            {work.worksToChoose.map(item => (
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
          <div>Стоимость: {work.price}$</div>
          <div>Длительность: {work.time} мин.</div>
        </div>
      )}
      {renderBtn && (
        <Button onClick={() => selectWorkStatus(work.order)} className={'h-max w-max self-center'} text='на этой' />
      )}
    </div>
  );
};

export default Work;
