import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questionIds, quiz } from '../../data';
import { IAnswer, IQuestion, IQuiz } from '../../types';

interface IActiveQuestion extends IQuestion {
    id: questionIds
}

interface IState {
    initialQuiz: IQuiz;
    quiz: IQuiz;
    quizKeys: questionIds[];
    answers: IAnswer[];
    lastQuestion: IQuestion | null;
    activeQuestion: IActiveQuestion | null;
}

const initialState: IState = {
    initialQuiz: quiz,
    quiz,
    quizKeys: Object.keys(quiz) as questionIds[],
    answers: [],
    lastQuestion: null,
    activeQuestion: null,
}

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setNewAnswer: (state: IState, action: PayloadAction<IAnswer>) => {
            const currentAnswer = state.answers.find(item => item.questionId === action.payload.questionId);
      
            if (currentAnswer) {
                state.answers.map((item) => item.questionId === currentAnswer.questionId ? currentAnswer : item)
            } else {
                state.answers.push(action.payload);
            }
        },
        setLastQuestion: (state: IState, action: PayloadAction<IQuestion>) => {
            state.lastQuestion = action.payload
        },
        clearAnswers: (state: IState) => {
            state.answers = [];
        },
        startQuiz: (state: IState) => {
            state.quiz = state.initialQuiz
            state.answers = [];
            state.activeQuestion = { ...state.quiz[questionIds.first], id: questionIds.first }
        },
        finishQuiz: (state: IState) => {
            state.quiz = state.initialQuiz
        },
        onNextQuestion: (state: IState, action: PayloadAction<IQuestion>) => {
            const currentKey: questionIds | undefined = state.quizKeys.find((_, inx) => inx === action.payload.order + 1);

            if (currentKey) {
                state.activeQuestion = { ...quiz[currentKey], id: currentKey }
            }
        },
        onPrevQuestion: (state: IState, action: PayloadAction<IQuestion>) => {
            const currentKey: questionIds | undefined = state.quizKeys.find((_, inx) => inx === action.payload.order - 1);

            if (currentKey) {
                state.activeQuestion = { ...quiz[currentKey], id: currentKey }
            }
        },
    }
})

export default quizSlice.reducer;
export const { 
    setNewAnswer,
    clearAnswers, 
    startQuiz,
    finishQuiz, 
    setLastQuestion, 
    onNextQuestion, 
    onPrevQuestion,
} = quizSlice.actions;