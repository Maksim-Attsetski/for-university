import { FC, MouseEvent } from 'react';
import s from './Button.module.scss';

interface IProps {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: FC<IProps> = ({ onClick, text, className = '' }) => {
  return (
    <button onClick={onClick} className={`${s.button} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
