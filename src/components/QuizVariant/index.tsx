import React, { FC } from 'react';
import { IVariants } from '../../types';

import s from './QuizVariant.module.scss';

interface IProps {
  variant: IVariants;
  activeVariant: IVariants | null;
  onSelectVariant: (id: string) => void;
}

const QuizVariant: FC<IProps> = ({ activeVariant, onSelectVariant, variant }) => {
  return (
    <div
      onClick={() => onSelectVariant(variant.systemId)}
      className={[s.variant, variant.systemId === activeVariant?.systemId ? s.active : ''].join(' ')}>
      <div className={s.text}>{variant.title}</div>
      <div className={s.blur} />
    </div>
  );
};

export default QuizVariant;
