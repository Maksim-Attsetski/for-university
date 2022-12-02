import { FC, MouseEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { routes } from '../../data';

import s from './Button.module.scss';

interface IProps {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  to?: routes | null;
  disabled?: boolean;
  isSecondary?: boolean;
  isDanger?: boolean;
}

const Button: FC<IProps> = ({
  onClick = () => {},
  text,
  className = '',
  to = null,
  disabled = false,
  isSecondary = false,
  isDanger = false,
}) => {
  const navigate = useNavigate();

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    to && navigate(to);
    onClick(event);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClickButton}
      data-secondary={isSecondary}
      data-danger={isDanger}
      className={`${s.button} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
