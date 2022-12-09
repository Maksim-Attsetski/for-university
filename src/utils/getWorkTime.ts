import { IWorkTotal } from '../types';

export const getWorkTime = (data: IWorkTotal): string => {
  const days: string[] = `${(data?.time || 1) / (24 * 60)}`.split('.'); // ["5", "25555"]
  const hours: number = Math.floor(+('0.' + days[1]) * 24); // ('0.' + '25555') * 24

  return `${days[0]} дн. ${hours} ч.`;
};
