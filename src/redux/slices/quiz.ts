import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnswer, IQuiz } from '../../types';

interface IState {
    quiz: IQuiz
}

const initialState: IState = {
    quiz: {
        quiestions: [
            {
                id: 1,
                title: 'First question',
                variants: [
                    {
                        id: 1,
                        text: 'first',
                    },
                    {
                        id: 2,
                        text: 'second',
                    },
                    {
                        id: 3,
                        text: 'third',
                    },
                ]
            }
        ],
        answers: []
    }
}

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setNewAnswer: (state: IState = initialState, action: PayloadAction<IAnswer>) => {
            state.quiz.answers.push(action.payload);
        }
    }
})

export default quizSlice.reducer;
export const { setNewAnswer } = quizSlice.actions;