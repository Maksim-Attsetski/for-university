/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routes } from '../../data';
import { IAnswer, IQuestion, IVariants } from '../../types';

import { Blur, Button, QuizVariant, Title } from '../../components';
import s from './BigQuizStep.module.scss';

const BigQuizStep: FC = () => {
  const { action } = useActions();
  const navigate = useNavigate();

  const { answers, index, quizKeys, quiz } = useTypedSelector(state => state.quiz);
  const [activeVariant, setActiveVariant] = useState<IVariants | null>(null);

  // @ts-ignore
  const activeQuestion: IQuestion | undefined = useMemo(() => quiz[index], [index]);

  const onClickNextQuestion = () => {
    if (!activeVariant || !activeQuestion) {
      return;
    }

    const { order, title } = activeQuestion;

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
      const currentAnswer: IAnswer | undefined | null = answers.find(el => el?.questionId === +questionId);
      return !!currentAnswer && currentAnswer.answer.systemId === answer;
    });

    if (invalidCondition) {
      action.setNewAnswer(null);
      changeQuestion();
    }
  }, [answers]);

  return (
    <div>
      <br />
      <div className={'container ' + s.quiz}>
        <Blur />
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
        <>
          <Button onClick={onClickPrevQuestion} text="Назад" disabled={index < 2} className={s.prev} />
          <Button
            onClick={onClickNextQuestion}
            text={index === quizKeys.length ? 'Завершить' : 'Далее'}
            disabled={!activeVariant}
            className={s.next}
          />
        </>
      </div>
    </div>
  );
};

export default BigQuizStep;
