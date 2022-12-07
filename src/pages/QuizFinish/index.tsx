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
  const { answers, floor, meter } = useTypedSelector(state => state.quiz);
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

    const priceFromSystem = systemsInAnswers.reduce((prev, cur) => (prev += cur.price), 0);
    const price: number = priceFromSystem * meter * floor;

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
        <div>
          Meter: <strong>{meter}</strong>
        </div>
        <div>
          Floor: <strong>{floor}</strong>
        </div>
        <div>
          Full price: <strong>{total.price.toFixed(4) || 0} BYN</strong>
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
                  <div>{system?.price} BYN</div>
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
