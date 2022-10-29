import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProject } from '../../types';

interface IState {
  projects: IProject[];
}

const initialState: IState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
    setProjects: (state: IState, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    deleteProject: (state: IState, action: PayloadAction<string>) => {
      state.projects = [...state.projects].filter(({ id }) => id !== action.payload);
    },
    addProject: (state: IState, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects];
    },
  },
});

export default projectsSlice.reducer;

export const { setProjects, deleteProject, addProject } = projectsSlice.actions;
