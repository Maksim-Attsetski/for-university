import { FC, useEffect, useMemo } from 'react';
import s from './WorkToast.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

interface IProps {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  data: { totalPrice: number; totalTime: number };
}

const WorkToast: FC<IProps> = ({ isVisible, setIsVisible, data }) => {
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

  const totalTime: string = useMemo(() => {
    const days: string[] = `${data.totalTime / (24 * 60)}`.split('.'); // ["5", "25555"]
    const hours: number = Math.floor(+('0.' + days[1]) * 24); // ('0.' + '25555') * 24

    return `${days[0]} дн. ${hours} ч.`;
  }, [data.totalTime]);

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className={s.toast}
        >
          <div>Денег: {data.totalPrice} $</div>
          <div>Времени: {totalTime}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default WorkToast;
