import React, { FC, useEffect } from 'react';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routeNames } from '../../types';
import { routes } from '../../data';

import { Button } from '../../components';
import s from './BigQuiz.module.scss';

const BigQuiz: FC = () => {
  const { answers, questions } = useTypedSelector(state => state.quiz);
  const { action } = useActions();

  useEffect(() => {
    if (answers.length === questions.length) {
      action.clearAnswers();
    }
  }, [answers, questions]);

  return (
    <div>
      <div className="container">
        <br />
        <div className={s.text}>BigQuiz</div>
        <br />
        <br />
        <Button to={(routes.quizBig + '/' + 1) as routeNames} text="Start quiz" />
      </div>
    </div>
  );
};

export default BigQuiz;
