/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { questionIds, routes } from '../../data';
import { IQuestion, IVariants } from '../../types';

import { Blur, Button, QuizVariant, Title } from '../../components';
import s from './BigQuizStep.module.scss';

const BigQuizStep: FC = () => {
  const { action } = useActions();
  const navigate = useNavigate();

  const { answers, quiz, quizKeys, activeQuestion } = useTypedSelector(state => state.quiz);
  const [activeVariant, setActiveVariant] = useState<IVariants | null>(null);
  console.log(quizKeys);

  const onClickNextQuestion = () => {
    if (!activeVariant || !activeQuestion) {
      return;
    }
    const { order, title, id } = activeQuestion;
    console.log(order, quizKeys.length);

    if (order === quizKeys.length) {
      action.finishQuiz();
      navigate(routes.quizBig);
      return;
    }

    if (order < quizKeys.length) {
      action.setNewAnswer({ answer: activeVariant, questionId: id, order, title });
      action.onNextQuestion(activeQuestion);
      setActiveVariant(null);
    }
  };

  const onClickPrevQuestion = () => {
    if (activeQuestion && activeQuestion.order >= 1) {
      // navigate(routes.quizBig + '/' + (+id - 1));
      action.onPrevQuestion(activeQuestion);
      setActiveVariant(null);
    }
  };

  const onClickDoneQuestion = () => {
    if (activeQuestion && activeVariant) {
      const { order, title, id } = activeQuestion;

      action.setNewAnswer({ answer: activeVariant, questionId: id, order, title });
    }
  };

  const onSelectVariant = (_id: string) => {
    const answer = activeQuestion?.variants.find(item => item.systemId === _id);
    answer && setActiveVariant(answer);
  };

  // useEffect(() => {
  //   if (id) {
  //     const currentAnswer = answers.find(item => item.questionId === +id);
  //     currentAnswer && setActiveVariant(currentAnswer);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (answers.length === questions.length) {
  //     alert('Наши поздравления, вы выбрали: ' + answers.map(item => item.text).join(', '));
  //     navigate(routes.quizBig);
  //   }
  // }, [answers, id]);

  return (
    <div>
      <br />
      <div className={'container ' + s.quiz}>
        <Blur />
        {activeQuestion && (
          <div>
            <Title text={activeQuestion.title} />
            <div>
              {activeQuestion.variants.map(item => (
                <QuizVariant onSelectVariant={onSelectVariant} variant={item} activeVariant={activeVariant} />
              ))}
            </div>
          </div>
        )}
        <br />
        <>
          <Button onClick={onClickPrevQuestion} text="prev" disabled={false} className={s.prev} />
          {/* {+id < questions.length && ( */}
          <Button onClick={onClickNextQuestion} text="next" disabled={!activeVariant} className={s.next} />
          {/* )} */}
          {/* {+id === questions.length && <Button onClick={onClickDoneQuestion} text="done" disabled={!activeVariant} />} */}
        </>
      </div>
    </div>
  );
};

export default BigQuizStep;
