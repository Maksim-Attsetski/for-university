import React, { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Title } from '../../components';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import useGetWorkInfo from '../../hooks/useGetWorkInfo';
import { getWorkTime } from '../../utils/getWorkTime';

import s from './QuizFinish.module.scss';

interface ITotal {
  price: number;
  workPrice: number;
  workTime: number;
}

const QuizFinish: FC = () => {
  const { answers, floor, meter } = useTypedSelector(state => state.quiz);
  const { systems } = useTypedSelector(state => state.systems);
  const [total, setTotal] = useState<ITotal>({ price: 0, workPrice: 0, workTime: 0 });

  const { action } = useActions();
  const { calcWorkInfo } = useGetWorkInfo();
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

    const total = calcWorkInfo(1, { floor: '' + floor, meter: '' + meter });

    action.setMaterialsPrice(price);
    setTotal(prev => ({
      ...prev,
      price,
      workPrice: total ? total.price : prev.price,
      workTime: total ? total.time : prev.workTime,
    }));
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
      <Title text="Поздавляем с успешным прохождением нашей викторины!" />
      <Title
        text='Теперь вы можете сохранить свои результаты во вкладке "мои проекты"
            для отслеживания оставшейся стоимости и длительности'
        className={s.subTitle}
      />
      <div className="container">
        <div>
          Метры: <strong>{meter}</strong>
        </div>
        <div>
          Этаж: <strong>{floor}</strong>
        </div>
        <div>
          Стоимость материалов: <strong>{total.price.toFixed(4) || 0} BYN</strong>
        </div>
        <div>
          <div>
            Стоимость работ: <strong>{total.workPrice} BYN</strong>
          </div>
          <div>
            Длиельность работ: <strong>{getWorkTime({ time: total.workTime, price: 0 })}</strong>
          </div>
        </div>
        <br />
        <div>
          <Button text="Мои проекты" to={routes.projects} />
        </div>
        <br />
        {Object.values(answers).map(answer => {
          const system = answer?.answer?.systemId ? systems[answer?.answer?.systemId] : null;
          return (
            <div key={answer.questionId} className={`${answer.answer ? s.active : ''} ${s.question}`}>
              <div className={s.question_content}>
                <div className="mb-3">{answer.title}</div>
                <div>{answer?.answer?.title}</div>
              </div>
              {system && (
                <div className={s.answer}>
                  <div className="mb-3">{system?.name}</div>
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
