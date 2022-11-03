import { IExchangeRate } from "../types";

interface IArguments {
    (workCurrency: IExchangeRate,
    price: number,
    currentCurrency: IExchangeRate): number
}

export const getCurrentPrice: IArguments = (workCurrency, price, currency) => {
    if (workCurrency.Cur_Abbreviation === currency.Cur_Abbreviation) return price;
    
    const currencyInByn = price / workCurrency.Cur_Scale * workCurrency.Cur_OfficialRate
    if (workCurrency.Cur_Abbreviation === 'BYN') return currencyInByn;

    const result = currencyInByn / currency.Cur_Scale *  currency.Cur_OfficialRate

    return +result.toFixed(4);
}