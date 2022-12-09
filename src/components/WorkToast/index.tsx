import { FC, useEffect, useMemo } from 'react';
import s from './WorkToast.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypedSelector } from '../../hooks/redux';
import { IWorkTotal } from '../../types';
import { getWorkTime } from '../../utils/getWorkTime';

interface IProps {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  data: IWorkTotal;
}

const WorkToast: FC<IProps> = ({ isVisible, setIsVisible, data }) => {
  const { currency } = useTypedSelector(state => state.exchangeRate);
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const totalTime: string = useMemo(() => (data ? getWorkTime(data) : ''), [data?.time]);

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className={s.toast}>
          <div>
            Денег: {data?.price} {currency?.Cur_Abbreviation}
          </div>
          <div>Времени: {totalTime}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default WorkToast;
