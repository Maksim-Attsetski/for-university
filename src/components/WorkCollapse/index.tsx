import { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Title from '../Title';

// import s from './WorkCollapse.module.scss';

interface IProps {
  title: string;
  data: any;
}

const WorkCollapse: FC<IProps> = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Title
        text={`${title} ${isOpen ? '↑' : '↓'}`}
        className='my-2 cursor-pointer'
        onClick={() => setIsOpen(prev => !prev)}
      />
      <AnimatePresence mode='popLayout'>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: 'spring', stiffness: 120, duration: 400 }}
          >
            {data}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default WorkCollapse;
