import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routes } from '../../data';

import { questionIds } from '../../data/quiz';
import { Button } from '../../components';
import s from './BigQuiz.module.scss';

const BigQuiz: FC = () => {
  const { answers } = useTypedSelector(state => state.quiz);
  const { action } = useActions();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(routes.quizBig + '/' + questionIds.first);
    action.startQuiz();
  };

  return (
    <div>
      <div className="container">
        <br />
        <div className={s.text}>BigQuiz</div>
        <br />
        <br />
        <Button onClick={startQuiz} text="Start quiz" />
      </div>
    </div>
  );
};

export default BigQuiz;
