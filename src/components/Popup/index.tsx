import { FC, ReactElement, ReactNode, useEffect } from 'react';
import useOutsideMenu from '../../hooks/useOutsideMenu';

import Button from '../Button';

import s from './Popup.module.scss';

interface IProps {
  children: ReactNode | ReactElement;
  isShow: boolean;
  setIsShow: (val: boolean) => void;
  buttonClassName?: string;
}

const Popup: FC<IProps> = ({ children, isShow, setIsShow, buttonClassName = '' }) => {
  const { ref, isShow: showPopup, setIsShow: setShowPopup } = useOutsideMenu(isShow);

  useEffect(() => {
    setIsShow(showPopup);
  }, [showPopup]);

  useEffect(() => {
    setShowPopup(isShow);
  }, [isShow]);

  return (
    <div>
      <div className={`${s.popup} ${isShow ? s.active : ''}`} ref={ref}>
        <div className={s.popup__body}>
          <Button className={`${s.popup__close} ${buttonClassName}`} onClick={() => setIsShow(false)} text="X" />
          {children}
        </div>
      </div>
      <div className={s.popup__shadow} />
    </div>
  );
};
export default Popup;
