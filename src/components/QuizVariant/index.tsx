import React, { FC } from 'react';
import { IVariant } from '../../types';

import s from './QuizVariant.module.scss';

interface IProps {
  variant: IVariant;
  activeVariant: IVariant | null;
  onSelectVariant: (id: string) => void;
}

const QuizVariant: FC<IProps> = ({ activeVariant, onSelectVariant, variant }) => {
  return (
    <div
      onClick={() => onSelectVariant(variant.id)}
      className={[s.variant, variant.id === activeVariant?.id ? s.active : ''].join(' ')}>
      <div className={s.text}>{variant.text}</div>
      <div className={s.blur} />
    </div>
  );
};

export default QuizVariant;
