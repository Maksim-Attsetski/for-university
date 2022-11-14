import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bigQuiz } from '../../data';
import { IVariant, IQuestion } from '../../types';

interface IState {
    questions: IQuestion[],
    answers: IVariant[]
}

const initialState: IState = {
    questions: bigQuiz,
    answers: []
}

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setNewAnswer: (state: IState, action: PayloadAction<IVariant>) => {
            const currentAnswer = state.answers.find(item => item.questionId === action.payload.questionId);
      
            if (currentAnswer) {
                state.answers.map((item) => item.questionId === currentAnswer.questionId ? currentAnswer : item)
            } else {
                state.answers.push(action.payload);
            }
        },
        clearAnswers: (state: IState) => {
            state.answers = [];
        }
    }
})

export default quizSlice.reducer;
export const { setNewAnswer, clearAnswers } = quizSlice.actions;