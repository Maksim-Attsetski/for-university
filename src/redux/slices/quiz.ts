/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { quiz } from '../../data';
import { IAnswer, IQuestion, IQuiz, typeOfAnswer } from '../../types';

type index = string | number;

interface IState {
  initialQuiz: IQuiz;
  quiz: IQuiz;
  quizKeys: string[];
  answers: typeOfAnswer;
  index: index;
  lastIndex: index;
  activeQuestion: IQuestion | undefined;
  meter: number;
  floor: number;
}

const initialState: IState = {
  initialQuiz: quiz,
  quiz,
  quizKeys: Object.keys(quiz),
  answers: {},
  index: 1,
  lastIndex: 1,
  activeQuestion: quiz[1],
  floor: 0,
  meter: 0,
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
      state.answers = {};
    },
    clearProjectInfo: (state: IState) => {
      state.floor = 0;
      state.meter = 0;
    },
    startQuiz: (state: IState) => {
      state.answers = {};
      state.index = 1;
      state.lastIndex = 1;
      state.activeQuestion = quiz[1];
    },
    finishQuiz: (state: IState) => {
      state.quiz = state.initialQuiz;
    },
    onNextQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
      state.lastIndex = state.index;
      const currentIndex: index = action.payload || +state.index + 1;
      state.index = currentIndex;

      // @ts-ignore
      state.activeQuestion = quiz[currentIndex];
    },
    onPrevQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
      state.lastIndex = state.index;
      const currentIndex: index = action.payload || +state.index - 1;
      state.index = currentIndex;

      state.activeQuestion?.order && delete state.answers[+state.activeQuestion?.order];
      // @ts-ignore
      state.activeQuestion = quiz[currentIndex];
    },
    setQuizInfo: (state: IState, action: PayloadAction<{ floor: number; meter: number }>) => {
      state.floor = action.payload.floor;
      state.meter = action.payload.meter;
    },
  },
});

export default quizSlice.reducer;
export const {
  setNewAnswer,
  clearProjectInfo,
  clearAnswers,
  startQuiz,
  finishQuiz,
  setQuizInfo,
  onNextQuestion,
  onPrevQuestion,
} = quizSlice.actions;
