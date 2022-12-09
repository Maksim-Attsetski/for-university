import { typeOfProject } from './../../types/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProject } from '../../types';

interface IState {
  projects: typeOfProject;
}

const initialState: IState = {
  projects: {},
};

const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
    setProjects: (state: IState, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {} as typeOfProject);
    },
    deleteProject: (state: IState, action: PayloadAction<string>) => {
      delete state.projects[action.payload];
    },
    addProject: (state: IState, action: PayloadAction<IProject>) => {
      state.projects[action.payload.id] = action.payload;
    },
    updateProject: (state: IState, action: PayloadAction<IProject>) => {
      state.projects[action.payload.id] = { ...state.projects[action.payload.id], ...action.payload };
    },
  },
});

export default projectsSlice.reducer;

export const { setProjects, deleteProject, addProject, updateProject } = projectsSlice.actions;
