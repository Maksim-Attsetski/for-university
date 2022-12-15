import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import s from './Toast.module.scss';

interface IProps {
  data: null | string;
  setData: (data: null) => void;
  isError?: boolean;
  expiredTime?: number;
}

const Toast: FC<IProps> = ({ data, setData, isError = false, expiredTime = 3000 }) => {
  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => {
      setData(null);
    }, expiredTime);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AnimatePresence initial={false}>
      {data ? (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 150, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          data-error={isError}
          className={s.toast}>
          {data}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
export default Toast;
