import React, { FC, ReactElement, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Title from '../Title';
import Blur from '../Blur';
import Button from '../Button';

import { optionAnim, selectAnim } from '../../animations';
import s from './Select.module.scss';

interface IProps {
  title: string | ReactElement;
  options: IOption[];
  containerClassName?: string;
  titleClassName?: string;
  selectClassName?: string;
  optionClassName?: string;
}

export interface IOption {
  title: string;
  onClick: () => void;
  icon: string | null;
  isButton?: boolean;
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

  const onOptionClick = (callBack: () => void) => {
    setIsOpen(false);
    callBack();
  };

  return (
    <motion.div className={[s.selectWrapper, containerClassName].join(' ')}>
      <Blur />
      {typeof title === 'string' ? (
        <Title
          text={title}
          onClick={() => setIsOpen(prev => !prev)}
          className={[s.selectTitle, titleClassName].join(' ')}
        />
      ) : (
        <div onClick={() => setIsOpen(prev => !prev)} className={[s.selectTitle, titleClassName].join(' ')}>
          {title}
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div {...selectAnim} className={[s.select, selectClassName].join(' ')}>
            {options.map((option, i) => (
              <motion.div key={`${option.title}${i}`} {...optionAnim} className={[s.option, optionClassName].join(' ')}>
                {!!option.icon && (
                  <div className={s.icon}>
                    <img src={option.icon} alt={option.title} />
                  </div>
                )}
                {option.isButton ? (
                  <Button text={option.title} onClick={() => onOptionClick(option.onClick)} />
                ) : (
                  <div onClick={() => onOptionClick(option.onClick)}>{option.title}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Select;
