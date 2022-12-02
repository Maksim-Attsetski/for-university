import { systems } from './../../data/system';
import { createSlice } from '@reduxjs/toolkit';
import { ISystem } from '../../types';

interface IState {
    systems: ISystem[],
}

const initialState = {
    systems
}


const systemsSlice = createSlice({
    name: 'systemsSlice',
    initialState,
    reducers: {
        setSystemPrice: (state: IState) => {
            state.systems = state.systems.map((item) => item);
        }
    }
})

export default systemsSlice.reducer
export const { setSystemPrice } = systemsSlice.actions