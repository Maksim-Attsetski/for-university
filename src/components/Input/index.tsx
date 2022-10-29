import { FC, useState, useMemo } from 'react';

import s from './Input.module.scss';

interface IProps {
  type?: string;
  text: string;
  setText: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  customLabel?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  isPass?: boolean;
  autoComplete?: boolean;
}

const Input: FC<IProps> = ({
  type = 'text',
  setText,
  text,
  required = false,
  className = '',
  placeholder = '',
  customLabel = '',
  onFocus = () => {},
  onBlur = () => {},
  isPass = false,
  autoComplete = false,
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

  return (
    <div>
      <label className={`${s.label} ${focus || text.length > 0 ? s.active : ''}`}>
        <span className={s.span}>{label}</span>
        <input
          type={inputType}
          value={text}
          onChange={e => setText(e.target.value)}
          required={required}
          placeholder={placeholder}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          autoComplete={isPass ? 'current-password' : ''}
          className={s.input + ' ' + className}
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
