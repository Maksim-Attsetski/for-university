import React, { FC, useState } from 'react';
import { IWork } from '../../types';
import s from './Work.module.scss';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  selectWorkStatus: (order: number) => void;
  workClass?: string;
}

const Work: FC<IProps> = ({ work, renderBtn, selectWorkStatus, workClass = '' }) => {
  const [activeWork, setActiveWork] = useState<null | IWork>(work);
  return (
    <div className={s.work}>
      {work.worksToChoose ? (
        <div>
          {activeWork && (
            <div className={s.title}>
              {activeWork.order}. {activeWork.name}
            </div>
          )}
          <div>
            <div className={s.subTitle}>Выберите работу:</div>
            <div onClick={() => setActiveWork(work)}>{work.name}</div>
            {work.worksToChoose.map(item => (
              <div key={item.name} onClick={() => setActiveWork(item)}>
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
          <div>Длтельность: {work.time} мин.</div>
        </div>
      )}
      {renderBtn && <button onClick={() => selectWorkStatus(work.order)}>на этой</button>}
    </div>
  );
};

export default Work;
