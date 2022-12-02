/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionIds, quiz } from '../../data';
import { IAnswer, IQuiz } from '../../types';

type index = questionIds | string | number;

interface IState {
    initialQuiz: IQuiz;
    quiz: IQuiz;
    quizKeys: questionIds[];
    answers: IAnswer[];
    index: index;
    lastIndex: index;
}

const initialState: IState = {
    initialQuiz: quiz,
    quiz,
    quizKeys: Object.keys(quiz) as questionIds[],
    answers: [],
    index: 1,
    lastIndex: 1
}

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setNewAnswer: (state: IState, action: PayloadAction<IAnswer>) => {
            const currentAnswer = state.answers.find(item => item?.questionId === action.payload?.questionId);
      
            if (currentAnswer) {
                console.log('answer exist');
                
                const newAnswers = [...state.answers].map((item) => item.questionId === action.payload?.questionId ? action.payload : item)
                console.log(newAnswers);
                state.answers = newAnswers
                
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