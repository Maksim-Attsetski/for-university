import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Popup, Title } from '../../components';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

// import s from './Quiz.module.scss';

const Quiz: FC = () => {
  const navigate = useNavigate();
  const { answers } = useTypedSelector(state => state.quiz);
  const { action } = useActions();

  const [isShow, setIsShow] = useState<boolean>(false);

  const onBigQuizStart = () => {
    Object.keys(answers).length > 0 ? setIsShow(true) : navigate(routes.quizBig);
  };

  const onClickRestart = () => {
    action.startQuiz();
    closeModal();
  };

  const closeModal = () => {
    setIsShow(false);
    document.body.classList.remove('hiddenBody');
    navigate(routes.quizBig);
  };

  return (
    <>
      <Popup isShow={isShow} setIsShow={setIsShow}>
        <Title text="Вы не кончили в прошлый раз😉" />
        <br />
        <br />
        <div className="flex gap-4 items-center">
          <Button text="Заново" onClick={onClickRestart} />
          <Button text="Продолжить" onClick={closeModal} />
        </div>
      </Popup>
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
          <Button text="Подробная викторина" onClick={onBigQuizStart} />
          <div>
            <p className="text-sm text-slate-700">здесь можно выбрать на какой работе вы остановились,</p>
            <p className="text-sm text-slate-700">а наш калькулятор посчитает стоимость и длительность проекта</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Quiz;
