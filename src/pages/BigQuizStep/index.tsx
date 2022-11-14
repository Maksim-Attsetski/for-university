import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components';
import { routes } from '../../data';
import s from './BigQuizStep.module.scss';

const BigQuizStep: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onClickNextQuestion = () => {
    if (id) {
      navigate(routes.quizBig + '/' + (+id + 1));
    }
  };

  const onClickPrevQuestion = () => {
    if (id && +id > 1) {
      navigate(routes.quizBig + '/' + (+id - 1));
    }
  };

  return (
    <div>
      <div className="container">
        <br />
        <div className={s.text}>BigQuizStep {id}</div>
        <br />
        <Button onClick={onClickPrevQuestion} text="prev" />
        <Button onClick={onClickNextQuestion} text="next" />
      </div>
    </div>
  );
};

export default BigQuizStep;
