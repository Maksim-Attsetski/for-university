import { images } from './../assets/index';
import { Cur_AbbreviationType } from './exchangeRate';

export interface ICatalogItem {
  id: number;
  name: string;
  price: number;
  time: string;
  image: typeof images.profileBg;
  description: string;
  size: ICatalogSize;
  materials: ICatalogMaterials;
  currency: Cur_AbbreviationType;
}

export interface ICatalogSize {
  'Общая площадь': string;
  'Площадь застройки': string;
  Кубатура: string;
  Высота: string;
  'Угол наклона кровли': string;
  'Площадь крыши': string;
  'Размеры участка': string;
  'Кол-во этажей': string;
}

export interface ICatalogMaterials {
  Фасад: string;
  Фундамент: string;
  Стены: string;
  Перекрытие: string;
  Кровля: string;
  Пол: string;
}
