import React, { FC, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { IWork } from '../../types';
import { Button } from '../';
import s from './Work.module.scss';

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

  return (
    <div className={s.work + ' ' + workClass}>
      {work.worksToChoose ? (
        <div>
          <div className={s.title}>
            {activeWork.order}. {activeWork.name}
          </div>
          <div>Стоимость: {activeWork.price}$</div>
          <div>Длительность: {activeWork.time} мин.</div>
          <div>
            <br />
            <div className={s.subTitle}>Выберите работу:</div>
            <div
              className={work.name === activeWork.name ? s.activeWork : s.notActiveWork}
              onClick={() => onChangeActiveWork(work)}
            >
              {work.name}
            </div>
            {work.worksToChoose.map(item => (
              <div
                key={item.name}
                className={item.name === activeWork.name ? s.activeWork : s.notActiveWork}
                onClick={() => onChangeActiveWork(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={s.title}>
            {work.order}. {work.name}
          </div>
          <div>Стоимость: {work.price}$</div>
          <div>Длительность: {work.time} мин.</div>
        </div>
      )}
      {renderBtn && <Button onClick={() => selectWorkStatus(work.order)} className={s.button} text='на этой' />}
    </div>
  );
};

export default Work;
