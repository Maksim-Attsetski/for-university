import { FC, useState } from 'react';

import { motion, Variants } from 'framer-motion';

import Title from '../Title';
import { IWork } from '../../types';

import s from './WorkCollapse.module.scss';

interface IProps {
  title: string;
  data: IWork[];
  renderWork: (work: IWork, i: number) => JSX.Element;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const WorkCollapse: FC<IProps> = ({ title, data, renderWork }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} className={s.menu}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
          <Title text={title} />
          <motion.div
            variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width='15' height='15' viewBox='0 0 20 20'>
              <path d='M0 7 L 20 7 L 10 16' />
            </svg>
          </motion.div>
        </motion.button>
        <motion.ul
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              height: 'max-content',
              transition: { type: 'spring', bounce: 0, duration: 0.7, delayChildren: 0.3, staggerChildren: 0.05 },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              height: 0,
              transition: { type: 'spring', bounce: 0, duration: 0.3 },
            },
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          {data.map((item, i) => (
            <motion.li key={i} variants={itemVariants}>
              {renderWork(item, i)}
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default WorkCollapse;
