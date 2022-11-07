import { IExchangeRate } from "../types";

interface IArguments {
    (workCurrency: IExchangeRate,
    price: number,
    currentCurrency: IExchangeRate): number
}

export const getCurrentPrice: IArguments = (workCurrency, price, currency) => {
    if (workCurrency.Cur_Abbreviation === currency.Cur_Abbreviation) return price;    
    if (workCurrency.Cur_Abbreviation === 'BYN') {
        return +((price / currency.Cur_OfficialRate) * currency.Cur_Scale).toFixed(4);
    }
        
    const currencyInByn = price / workCurrency.Cur_Scale * workCurrency.Cur_OfficialRate;
    const currentCurrency = price / currency.Cur_Scale *  currency.Cur_OfficialRate;
    const result = currencyInByn / currentCurrency;

    return price * +result.toFixed(4);
}