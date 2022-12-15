import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { typeOfProject } from './../../types/project';
import { IProject } from '../../types';

interface IState {
  projects: typeOfProject;
  materialsPrice: number | null;
  limit: number;
}

const initialState: IState = {
  projects: {},
  materialsPrice: null,
  limit: 5,
};

const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
    setMaterialsPrice: (state: IState, action: PayloadAction<number | null>) => {
      state.materialsPrice = action.payload;
    },
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

export const { setProjects, deleteProject, setMaterialsPrice, addProject, updateProject } = projectsSlice.actions;
