import React, { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

// import s from './QuizFinish.module.scss';

interface ITotal {
  price: number;
}

const QuizFinish: FC = () => {
  const { answers } = useTypedSelector(state => state.quiz);
  const { systems } = useTypedSelector(state => state.systems);
  const [total, setTotal] = useState<ITotal>({ price: 0 });
  const { action } = useActions();
  const navigate = useNavigate();

  const setTotalPrice = () => {
    let systemsInAnswers = [];

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];

      for (let j = 0; j < systems.length; j++) {
        const system = systems[j];
        if (system.id === answer.answer?.systemId) {
          systemsInAnswers.push(system);
        }
      }
    }

    const price = systemsInAnswers.reduce((prev, cur) => (prev += cur.price), 0);

    setTotal(prev => ({ ...prev, price }));
  };

  const resetQuiz = () => {
    navigate(routes.quizBig);
    action.startQuiz();
  };

  useEffect(() => {
    answers.length === 0 ? resetQuiz() : setTotalPrice();
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        <div className="flex gap-4 flex-wrap items-center">
          <div>
            <strong>Full price for all custom systems</strong>
          </div>
          <div className="px-2 py-1 bg-title-color text-white w-max rounded-md">{total.price}</div>
        </div>
        <br />
        {answers.map(
          answer =>
            answer && (
              <div key={answer.questionId}>
                <div>{answer.title}</div>
                <div>{answer?.answer?.title}</div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default QuizFinish;
