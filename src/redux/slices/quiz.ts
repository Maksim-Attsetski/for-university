/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionIds, quiz } from '../../data';
import { IAnswer, IQuiz } from '../../types';

interface IState {
    initialQuiz: IQuiz;
    quiz: IQuiz;
    quizKeys: questionIds[];
    answers: (IAnswer | null)[];
    index: questionIds | string | number;
}

const initialState: IState = {
    initialQuiz: quiz,
    quiz,
    quizKeys: Object.keys(quiz) as questionIds[],
    answers: [],
    index: 1
}

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setNewAnswer: (state: IState, action: PayloadAction<IAnswer | null>) => {
            const currentAnswer = state.answers.find(item => item?.questionId === action.payload?.questionId);
      
            if (currentAnswer) {
                state.answers.map((item) => item?.questionId === currentAnswer.questionId ? currentAnswer : item)
            } else {
                state.answers.push(action.payload);
            }
        },
        clearAnswers: (state: IState) => {
            state.answers = [];
        },
        startQuiz: (state: IState) => {
            state.quiz = state.initialQuiz
            state.answers = [];
            state.index = 1;
        },
        finishQuiz: (state: IState) => {
            state.quiz = state.initialQuiz;
        },
        onNextQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
            state.index = action.payload || +state.index + 1;
        },
        onPrevQuestion: (state: IState, action: PayloadAction<number | undefined>) => {
            state.index = action.payload || +state.index - 1;
        },
    }
})

export default quizSlice.reducer;
export const { 
    setNewAnswer,
    clearAnswers, 
    startQuiz,
    finishQuiz, 
    onNextQuestion, 
    onPrevQuestion,
} = quizSlice.actions;