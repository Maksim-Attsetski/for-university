import { Cur_AbbreviationType } from "./exchangeRate";
import { workUnitOfMeasure } from "./work";

export type materialName = 'first material' | 'second material';

export interface IMaterial {
  _id: string;
  name: materialName;
  unitOfMeasure: workUnitOfMeasure;
  price: number;
  // расходы
  thickness: number;
  coefficient: number,
  currency: Cur_AbbreviationType
}
