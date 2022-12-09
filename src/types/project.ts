import { Cur_AbbreviationType } from './exchangeRate';
import { typeOfAnswer } from './quiz';

export interface IProjectInfo {
  meter: string;
  floor: string;
}
export interface IProject {
  id: string;
  authorUid: string;
  name: string;
  isDone: boolean;
  workId: number;
  price: number;
  time: number;
  createdAt: number;
  answers: typeOfAnswer | null;
  info: IProjectInfo;
  currency: Cur_AbbreviationType;
}

export type typeOfProject = {
  [key: IProject['id']]: IProject;
};
