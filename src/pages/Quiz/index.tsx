import { FC } from 'react';

import { Button, Title } from '../../components';

import { routes } from '../../data';

// import s from './Quiz.module.scss';

const Quiz: FC = () => {
  return (
    <div>
      <div className="container">
        <br />
        <Title text="Викторины" />
        <br />
        <div className="flex gap-6">
          <Button text="Маленькая викторина" to={routes.quizSmall} />
          <div>
            <p className="text-sm text-slate-700">здесь можно выбрать на какой работе вы остановились,</p>
            <p className="text-sm text-slate-700">а наш калькулятор посчитает стоимость и длительность проекта</p>
          </div>
        </div>
        <div className="flex gap-6 my-4">
          <Button text="Подробная викторина" to={routes.quizBig} />
          <div>
            <p className="text-sm text-slate-700">здесь можно выбрать на какой работе вы остановились,</p>
            <p className="text-sm text-slate-700">а наш калькулятор посчитает стоимость и длительность проекта</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
