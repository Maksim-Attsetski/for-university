import { IWork } from '../types';

interface IProps {
  (works: IWork[], order: number, meter: string): { price: number; time: number };
}

export const getWorkPriceAndTime: IProps = (works, order, meter) => {
  const futureWorks: IWork[] = works.filter(work => work.order > order);

  const price: number = futureWorks.reduce(
    (prev, cur) => (prev += (cur.activeWork ? cur.activeWork.price : cur.price) * +meter),
    0
  );
  const time: number = futureWorks.reduce(
    (prev, cur) => (prev += (cur.activeWork ? cur.activeWork.time : cur.time) * +meter),
    0
  );
  return { price, time };
};
