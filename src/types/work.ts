import { materialName } from './material';

export type workName = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface IWork {
  _id: string;
  name: workName;
  order: number;
  price: number;
  time: number;
  materials: materialName[];
}
