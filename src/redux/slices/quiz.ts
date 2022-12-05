/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionIds, quiz } from '../../data';
import { IAnswer, IQuiz, typeOfAnswer } from '../../types';

type index = questionIds | string | number;

interface IState {
  initialQuiz: IQuiz;
  quiz: IQuiz;
  quizKeys: (questionIds | string)[];
  answers: typeOfAnswer;
  index: index;
  lastIndex: index;
}

const initialState: IState = {
  initialQuiz: quiz,
  quiz,
  quizKeys: Object.keys(quiz) as (questionIds | string)[],
  answers: [],
  index: 1,
  lastIndex: 1,
};

const quizSlice = createSlice({
  name: 'quizSlice',
  initialState,
  reducers: {
    setNewAnswer: (state: IState, action: PayloadAction<IAnswer>) => {
      const currentAnswer = state.answers[action.payload?.questionId];

      state.answers[action.payload?.questionId] = currentAnswer
        ? JSON.parse(JSON.stringify(action.payload))
        : action.payload;
    },
    clearAnswers: (state: IState) => {
      state.answers = [];
    },
    startQuiz: (state: IState) => {
      state.quiz = state.initialQuiz;
      state.answers = {};
      state.index = 1;
      state.lastIndex = 1;
    },
    finishQuiz: (state: IState) => {
      state.quiz = state.initialQuiz;
    },
    onNextQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
      state.lastIndex = state.index;
      state.index = action.payload || +state.index + 1;
    },
    onPrevQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
      state.lastIndex = state.index;
      state.index = action.payload || +state.index - 1;
    },
  },
});

export default quizSlice.reducer;
export const { setNewAnswer, clearAnswers, startQuiz, finishQuiz, onNextQuestion, onPrevQuestion } = quizSlice.actions;
