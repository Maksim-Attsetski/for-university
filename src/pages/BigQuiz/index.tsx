import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../data';
import s from './BigQuiz.module.scss';

const BigQuiz: FC = () => {
  return (
    <div>
      <div className="container">
        <br />
        <div className={s.text}>BigQuiz</div>
        <br />
        <br />
        <Link to={routes.quizBig + '/' + 1}>Start</Link>
      </div>
    </div>
  );
};

export default BigQuiz;
