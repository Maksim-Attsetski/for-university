import { FC } from 'react';

import s from './Title.module.scss';

interface IProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Title: FC<IProps> = ({ text, className = '', onClick = () => {} }) => {
  return (
    <div className={s.title + ' ' + className} onClick={onClick}>
      {text}
    </div>
  );
};

export default Title;
