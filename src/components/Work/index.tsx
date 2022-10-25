import React, { FC } from 'react';
import { IWork } from '../../types';
import s from './Work.module.scss';

interface IProps {
  work: IWork;
  renderBtn: boolean;
  selectWorkStatus: (order: number) => void;
  workClass?: string;
}

const Work: FC<IProps> = ({ work, renderBtn, selectWorkStatus, workClass = '' }) => {
  return (
    <div className={s.work}>
      <div>
        <div className={s.title}>
          {work.order}. {work.name}
        </div>
        <div>Стоимость: {work.price}$</div>
        <div>Длтельность: {work.time} мин.</div>
      </div>
      {renderBtn && <button onClick={() => selectWorkStatus(work.order)}>на этой</button>}
    </div>
  );
};

export default Work;
