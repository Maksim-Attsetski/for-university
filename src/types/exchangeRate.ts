
export type Cur_AbbreviationType = 'AUD' | 'AMD' | 'BGN' | 'BRL' | 'UAH' | 'DKK' | 'AED'
 | 'USD' | 'VND' | 'EUR' | 'PLN' | 'JPY' | 'INR' | 'IRR' | 'ISK' | 'CAD' | 'CNY' | 'KWD'
 | 'MDL' | 'NZD' | 'NOK' | 'RUB' | 'XDR' | 'SGD' | 'KGS' | 'KZT' | 'TRY' | 'GBP' | 'CZK'
 | 'SEK' | 'CHF' | 'BYN';


export interface IExchangeRate {
    Cur_Abbreviation: Cur_AbbreviationType;
    Cur_ID: number;
    Cur_Name: string;
    Cur_OfficialRate: number;
    Cur_Scale: number 
    Date: string;
}
export const defaultExchangeRate: IExchangeRate = {
    Cur_Abbreviation: 'BYN',
    Cur_ID: 765435676543256,
    Cur_Name: 'Белорусский рубль',
    Cur_OfficialRate: 1,
    Cur_Scale: 1,
    Date: new Date().toDateString(),
}