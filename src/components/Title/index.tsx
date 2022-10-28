import { FC } from 'react';

import s from './Title.module.scss';

interface IProps {
  text: string;
}

const Title: FC<IProps> = ({ text }) => {
  return <div className={s.title}>{text}</div>;
};

export default Title;
