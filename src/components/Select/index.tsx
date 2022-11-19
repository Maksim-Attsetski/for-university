import React, { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { optionAnim, selectAnim } from '../../animations';
import Title from '../Title';
import Blur from '../Blur';

import s from './Select.module.scss';

interface IProps {
  title: string;
  options: IOption[];
  containerClassName?: string;
  titleClassName?: string;
  selectClassName?: string;
  optionClassName?: string;
}

export interface IOption {
  title: string;
  onClick: () => void;
}

const Select: FC<IProps> = ({
  title,
  options,
  containerClassName = '',
  titleClassName = '',
  optionClassName = '',
  selectClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div className={[s.selectWrapper, containerClassName].join(' ')}>
      <Blur />
      <Title
        text={title}
        onClick={() => setIsOpen(prev => !prev)}
        className={[s.selectTitle, titleClassName].join(' ')}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div {...selectAnim} className={[s.select, selectClassName].join(' ')}>
            {options.map(option => (
              <motion.div {...optionAnim} className={[s.option, optionClassName].join(' ')} onClick={option.onClick}>
                {option.title}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Select;
