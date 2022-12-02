import { Cur_AbbreviationType } from './exchangeRate';
import { workUnitOfMeasure } from './work';
import { systemsIds } from "../data"


interface IMaterial {
    id: string;
    name: string;
    thickness: number;
    unitOfMeasure: workUnitOfMeasure;
    price: number;
    currency: Cur_AbbreviationType
}

interface ISystem {
    id: systemsIds,
    materials: IMaterial[],
    price: number,
}

export type { ISystem, IMaterial }