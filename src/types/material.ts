export type materialName = 'first material' | 'second material';
export type materialType = 'meter' | 'thing';

export interface IMaterial {
  _id: string;
  name: materialName;
  type: materialType;
  price: number;
  // расходы
  consumption: number;
}
