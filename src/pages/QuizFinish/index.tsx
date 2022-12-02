import React, { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

// import s from './QuizFinish.module.scss';

const QuizFinish: FC = () => {
  const { answers } = useTypedSelector(state => state.quiz);
  const { action } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (answers.length === 0) {
      navigate(routes.quizBig);
      action.startQuiz();
    }
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        {answers.map(
          answer =>
            answer && (
              <div key={answer.questionId}>
                <div>{answer.title}</div>
                <div>{answer.answer.title}</div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default QuizFinish;
