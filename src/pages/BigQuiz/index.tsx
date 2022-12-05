/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routes } from '../../data';
import { IAnswer, IQuestion, IVariants } from '../../types';

import { Button, QuizVariant, Title } from '../../components';
import s from './BigQuiz.module.scss';
import { images } from '../../assets';

const BigQuiz: FC = () => {
  const { action } = useActions();
  const navigate = useNavigate();

  const { answers, index, quizKeys, quiz, lastIndex } = useTypedSelector(state => state.quiz);
  const [activeVariant, setActiveVariant] = useState<IVariants | null>(null);

  // @ts-ignore
  const activeQuestion: IQuestion | undefined = useMemo(() => quiz[index], [index]);

  const onClickNextQuestion = () => {
    if (!activeVariant || !activeQuestion) {
      return;
    }

    const { order, title } = activeQuestion;
    console.log(activeQuestion);

    action.setNewAnswer({ answer: activeVariant, questionId: order, order, title });
    if (index === quizKeys.length) {
      action.finishQuiz();
      navigate(routes.quizFinish);
      return;
    }

    if (index < quizKeys.length) {
      changeQuestion();
    }
  };

  const onClickPrevQuestion = () => {
    changeQuestion(true);
  };

  const changeQuestion = (prev: boolean = false) => {
    setActiveVariant(null);
    prev ? action.onPrevQuestion() : action.onNextQuestion();
  };

  const onSelectVariant = (_id: string) => {
    const answer = activeQuestion?.variants.find(item => item.systemId === _id);
    answer && setActiveVariant(answer);
  };

  useEffect(() => {
    action.startQuiz();
  }, []);

  useEffect(() => {
    if (!activeQuestion || !activeQuestion.condition) {
      return;
    }

    const invalidCondition = activeQuestion.condition.some(({ answer, questionId }) => {
      const currentAnswer: IAnswer | undefined | null = answers[questionId];
      return !!currentAnswer && currentAnswer.answer?.systemId === answer;
    });

    if (invalidCondition) {
      action.setNewAnswer({ order: null, title: null, questionId: activeQuestion.order, answer: null });
      changeQuestion(lastIndex > index);
    }
  }, [answers, index]);

  return (
    <div className={s.quizPage}>
      <br />
      <img src={images.quizBg} alt="quiz background" className={s.bgImage} />
      <div></div>
      <div className={s.quiz}>
        {activeQuestion && (
          <div>
            <Title text={activeQuestion.title} />
            <div>
              {activeQuestion.variants.map((item, i) => (
                <QuizVariant
                  key={item.systemId + i}
                  onSelectVariant={onSelectVariant}
                  variant={item}
                  activeVariant={activeVariant}
                />
              ))}
            </div>
          </div>
        )}
        <br />
        <div className="flex gap-5 items-center">
          <Button onClick={onClickPrevQuestion} text="Назад" disabled={index < 2} className={s.prev} />
          <div>
            {activeQuestion?.order} / {quizKeys.length}
          </div>
          <Button
            onClick={onClickNextQuestion}
            text={index === quizKeys.length ? 'Завершить' : 'Далее'}
            disabled={!activeVariant}
            className={s.next}
          />
        </div>
      </div>
    </div>
  );
};

export default BigQuiz;
