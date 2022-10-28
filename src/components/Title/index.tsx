import { FC } from 'react';

import s from './Title.module.scss';

interface IProps {
  text: string;
  className?: string;
}

const Title: FC<IProps> = ({ text, className = '' }) => {
  return <div className={s.title + ' ' + className}>{text}</div>;
};

export default Title;
