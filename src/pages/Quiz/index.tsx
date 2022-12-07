import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Popup, Title, Toast } from '../../components';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import { getErrorMsg } from '../../utils';

import s from './Quiz.module.scss';

const Quiz: FC = () => {
  const navigate = useNavigate();
  const { answers } = useTypedSelector(state => state.quiz);
  const { action } = useActions();
  const [quizInfo, setQuizInfo] = useState<{ meter: string; floor: string }>({
    floor: '1',
    meter: '1',
  });

  const [isShow, setIsShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onBigQuizStart = () => {
    try {
      const meter = +quizInfo.meter;
      const floor = +quizInfo.floor;

      if (meter > 1000 || meter < 1) {
        throw new Error('invalid meters');
      }

      if (floor > 3 || floor < 1) {
        throw new Error('invalid floor');
      }

      action.setQuizInfo({ floor, meter });
      Object.keys(answers).length > 0 ? setIsShow(true) : navigate(routes.quizBig);
    } catch (err) {
      const msg = getErrorMsg(err);
      setError(msg);
    }
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

  const quizBlock = (title: string, text: string, needInput: boolean = false, onClick: () => void) => {
    return (
      <div className={s.quizBlock}>
        <div className={s.blockContent}>
          <Title text={title} className="mb-3" />
          <p className="text-sm text-slate-700">{text}</p>
        </div>
        <div className={`${s.blockContent} ${s.buttonsContainer}`}>
          {needInput ? (
            <div className="flex flex-wrap gap-4">
              <Input
                maxLength={4}
                max={1000}
                type="number"
                placeholder="Кв. метры"
                text={quizInfo.meter}
                setText={meter => setQuizInfo({ ...quizInfo, meter })}
              />
              <Input
                maxLength={1}
                max={3}
                type="number"
                placeholder="Этаж"
                text={quizInfo.floor}
                setText={floor => setQuizInfo({ ...quizInfo, floor })}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4"></div>
          )}
          <Button text="Начать" onClick={onClick} />
        </div>
      </div>
    );
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
      <Toast data={error} setData={setError} isError />
      <div className={'container ' + s.mainBlock}>
        <br />
        {quizBlock(
          'Незавершенное строительство',
          'Здесь можно выбрать на какой стадии остановились работы, а наш калькулятор посчитает стоимость и длительность проекта.',
          false,
          () => navigate(routes.quizSmall),
        )}
        <div className={s.line}></div>
        {quizBlock(
          'Незавершенное строительство',
          'Здесь можно выбрать на какой стадии остановились работы, а наш калькулятор посчитает стоимость и длительность проекта.',
          true,
          onBigQuizStart,
        )}
      </div>
    </>
  );
};
export default Quiz;
