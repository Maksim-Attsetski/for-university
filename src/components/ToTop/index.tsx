import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

import s from './ToTop.module.scss';

const ToTop: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(val => setIsShow(val > 400));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isShow ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isShow ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className={s.toTop}
          onClick={() => {
            window.scrollTo({ behavior: 'smooth', top: 0 });
          }}
        >
          <div className={s.arrow}>↑</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
export default ToTop;
