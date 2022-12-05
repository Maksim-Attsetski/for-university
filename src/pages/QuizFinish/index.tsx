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

    for (const key in answers) {
      const answer = answers[key];

      for (const key in systems) {
        const system = systems[key];

        if (system.id === answer.answer?.systemId) {
          systemsInAnswers.push(system);
        }
      }
    }

    const price = systemsInAnswers.reduce((prev, cur) => (prev += cur.price), 0);
    setTotal(prev => ({ ...prev, price }));
  };

  const resetQuiz = () => {
    navigate(routes.quiz);
    action.startQuiz();
  };

  useEffect(() => {
    Object.keys(answers).length === 0 ? resetQuiz() : setTotalPrice();
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        <div className="flex gap-4 flex-wrap items-center">
          <div>
            <strong>Full price</strong>
          </div>
          <div className="px-2 py-1 bg-title-color text-white w-max rounded-md">{total.price.toFixed(4) || 0} $</div>
        </div>
        <br />
        {Object.values(answers).map(answer => {
          const system = answer?.answer?.systemId ? systems[answer?.answer?.systemId] : null;
          return (
            <div
              key={answer.questionId}
              className={answer.answer ? `border-b-1 pt-2 pb-3 border-title-color border-solid` : ''}>
              <div>{answer.title}</div>
              <hr />
              <div>{answer?.answer?.title}</div>
              <hr />
              {system && (
                <div className="flex items-center gap-3">
                  <div>{system?.name}</div>
                  <div>{system?.price} $</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizFinish;
