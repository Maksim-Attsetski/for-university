import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../types';
import s from './Button.module.scss';

interface IProps {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  to?: routeNames | null;
}

const Button: FC<IProps> = ({ onClick = () => {}, text, className = '', to = null }) => {
  const navigate = useNavigate();

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    to && navigate(to);
    onClick(event);
  };

  return (
    <button onClick={handleClickButton} className={`${s.button} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
