/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';

import { images } from '../../assets';
import s from './Arrows.module.scss';

interface IProps {
  onLeftClick: () => void;
  leftDisable: boolean;
  onRightClick: () => void;
  rightDisable: boolean;
  order: number;
  lenght: number;
}

const Arrows: FC<IProps> = ({ leftDisable, onLeftClick, onRightClick, order, rightDisable, lenght }) => {
  return (
    <div className={s.arrowContainer}>
      <img
        onClick={onLeftClick}
        className={s.quizArrow}
        data-disabled={leftDisable}
        src={images.quizArrowLeft}
        alt="quizArrowLeft"
      />
      <span className={s.quizLine}></span>
      <div>
        {order} / {lenght}
      </div>
      <span className={s.quizLine}></span>
      <img
        className={s.quizArrow}
        data-disabled={rightDisable}
        onClick={onRightClick}
        src={images.quizArrowRight}
        alt="quizArrowRight"
      />
    </div>
  );
};

export default Arrows;
