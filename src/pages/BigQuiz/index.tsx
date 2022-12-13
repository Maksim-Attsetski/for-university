/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routes } from '../../data';
import { IAnswer, IVariants } from '../../types';

import { Arrows, QuizVariant, Title } from '../../components';
import s from './BigQuiz.module.scss';
import { images } from '../../assets';

const BigQuiz: FC = () => {
  const { action } = useActions();
  const navigate = useNavigate();

  const { answers, index, quizKeys, activeQuestion, quiz, lastIndex } = useTypedSelector(state => state.quiz);
  const { floor, meter } = useTypedSelector(state => state.quiz);
  const [activeVariant, setActiveVariant] = useState<IVariants | null>(null);

  // @ts-ignore
  const quizLength = useMemo(() => quiz[quizKeys.length - 1].order, [quizKeys]);

  const onClickNextQuestion = () => {
    if (!activeVariant || !activeQuestion) {
      return;
    }

    const { order, title } = activeQuestion;

    action.setNewAnswer({ answer: activeVariant, questionId: order, order, title });
    if (index === quizKeys.length) {
      onFinishQuiz();
      return;
    }

    if (index < quizKeys.length) {
      changeQuestion();
    }
  };

  const onFinishQuiz = () => {
    action.finishQuiz();
    navigate(routes.quizFinish);
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
    if (!activeQuestion || !activeQuestion.condition) {
      return;
    }

    const invalidCondition = activeQuestion.condition.some(({ answer, questionId }) => {
      const currentAnswer: IAnswer | undefined | null = answers[questionId];
      return !!currentAnswer && currentAnswer.answer?.systemId === answer;
    });

    if (invalidCondition) {
      action.setNewAnswer({ order: activeQuestion.order, title: null, questionId: activeQuestion.id, answer: null });
      changeQuestion(lastIndex > index);
    }
  }, [answers, index]);

  useEffect(() => {
    index > quizKeys.length && onFinishQuiz();
  }, [index]);

  useEffect(() => {
    if (!floor || !meter) {
      navigate(routes.quiz);
    }
  }, []);

  return (
    <div className={s.quizPage}>
      <br />
      <img src={images.quizBg} alt="quiz background" className={s.bgImage} />
      <div></div>
      <div className={s.quiz}>
        {activeQuestion && (
          <div>
            <Title text={activeQuestion.title} className={s.questionTitle} />
            <div className="my-6">
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
        <Arrows
          leftDisable={index < 2}
          onLeftClick={index < 2 ? () => {} : onClickPrevQuestion}
          order={activeQuestion?.order ? +activeQuestion?.order : 1}
          lenght={quizLength}
          onRightClick={!activeVariant ? () => {} : onClickNextQuestion}
          rightDisable={!activeVariant}
        />
      </div>
    </div>
  );
};

export default BigQuiz;
