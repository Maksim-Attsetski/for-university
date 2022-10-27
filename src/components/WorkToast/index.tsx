import { FC, useEffect } from 'react';
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
          <div>Времени: {data.totalTime} минут</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default WorkToast;
