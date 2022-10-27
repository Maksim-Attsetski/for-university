import { FC } from 'react';

interface IProps {
  type?: string;
  text: string;
  setText: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Input: FC<IProps> = ({ type = 'text', setText, text, required = false, className = '', placeholder = '' }) => {
  return (
    <input
      type={type}
      value={text}
      onChange={e => setText(e.target.value)}
      required={required}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
