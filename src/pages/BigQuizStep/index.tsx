import React, { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import { routes } from '../../data';
import { IVariant } from '../../types';

import { Blur, Button, QuizVariant, Title } from '../../components';
import s from './BigQuizStep.module.scss';

const BigQuizStep: FC = () => {
  const { id } = useParams();
  const { action } = useActions();
  const navigate = useNavigate();
  const { questions, answers } = useTypedSelector(state => state.quiz);
  const [activeVariant, setActiveVariant] = useState<IVariant | null>(null);

  const onClickNextQuestion = () => {
    if (!id || !activeVariant) {
      return;
    }

    action.setNewAnswer(activeVariant);

    if (+id < questions.length) {
      navigate(routes.quizBig + '/' + (+id + 1));
    } else if (+id === questions.length) {
      navigate(routes.quizBig);
    }
  };

  const onClickPrevQuestion = () => {
    if (id && +id > 1) {
      navigate(routes.quizBig + '/' + (+id - 1));
    }
  };

  const onClickDoneQuestion = () => {
    if (id && activeVariant) {
      action.setNewAnswer(activeVariant);
    }
  };

  const question = useMemo(() => (id ? questions[+id - 1] : null), [id]);

  const onSelectVariant = (_id: string) => {
    const answer = question?.variants.find(item => item.id === _id);
    answer && setActiveVariant(answer);
  };

  useEffect(() => {
    if (id) {
      const currentAnswer = answers.find(item => item.questionId === +id);
      currentAnswer && setActiveVariant(currentAnswer);
    }
  }, [id]);

  useEffect(() => {
    if (answers.length === questions.length) {
      alert('Наши поздравления, вы выбрали: ' + answers.map(item => item.text).join(', '));
      navigate(routes.quizBig);
    }
  }, [answers, id]);

  return (
    <div>
      <br />
      <div className={'container ' + s.quiz}>
        <Blur />
        {question && (
          <div>
            <Title text={question.title} />
            <div>
              {question.variants.map(item => (
                <QuizVariant onSelectVariant={onSelectVariant} variant={item} activeVariant={activeVariant} />
              ))}
            </div>
          </div>
        )}
        <br />
        {id && (
          <>
            <Button onClick={onClickPrevQuestion} text="prev" disabled={+id === 1} className={s.prev} />
            {+id < questions.length && (
              <Button onClick={onClickNextQuestion} text="next" disabled={!activeVariant} className={s.next} />
            )}
            {+id === questions.length && <Button onClick={onClickDoneQuestion} text="done" disabled={!activeVariant} />}
          </>
        )}
      </div>
    </div>
  );
};

export default BigQuizStep;
