import { FC, useState, useMemo } from 'react';

import s from './Input.module.scss';

interface IProps {
  type?: string;
  text: string;
  setText: (value: string) => void;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  customLabel?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  isPass?: boolean;
  max?: number | null;
}

const Input: FC<IProps> = ({
  type = 'text',
  setText,
  text,
  required = false,
  className = '',
  containerClassName = '',
  placeholder = '',
  customLabel = '',
  onFocus = () => {},
  onBlur = () => {},
  isPass = false,
  max = null,
}) => {
  const label: string = useMemo(() => (customLabel ? customLabel : placeholder), [customLabel, placeholder]);
  const [focus, setFocus] = useState<boolean>(false);
  const [isPassShown, setIsPassShown] = useState<boolean>(false);
  const inputType = useMemo(() => (isPassShown ? 'text' : isPass ? 'password' : type), [isPass, isPassShown, type]);

  const onInputFocus = () => {
    setFocus(true);
    onFocus();
  };
  const onInputBlur = () => {
    setFocus(false);
    onBlur();
  };

  const onChange = (text: string) => {
    if (type === 'number') {
      setText(text.replace(/\D/, ''));
    } else {
      setText(text);
    }
  };

  return (
    <div className={containerClassName}>
      <label className={`${s.label} ${focus || text.length > 0 ? s.active : ''}`}>
        <span className={s.span}>{label}</span>
        <input
          type={inputType === 'number' ? 'text' : inputType}
          value={text}
          onChange={e => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          autoComplete={isPass ? 'current-password' : ''}
          className={s.input + ' ' + className}
          max={max || 9999}
        />
        {isPass && (
          <span className={s.passIcon} onClick={() => setIsPassShown(prev => !prev)}>
            {isPassShown ? 'O' : '—'}
          </span>
        )}
      </label>
    </div>
  );
};

export default Input;
