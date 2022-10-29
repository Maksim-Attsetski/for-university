import { FC, ReactNode } from 'react';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import Button from '../Button';
import s from './Popup.module.scss';

interface IProps {
  renderBody: (setIsShow: (val: boolean) => void) => JSX.Element;
  buttonText: string;
  buttonClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const Popup: FC<IProps> = ({ renderBody, buttonText, onOpen = () => {}, onClose = () => {}, buttonClassName = '' }) => {
  const { isShow, setIsShow, ref } = useOutsideMenu();

  const handleOpenPopup = () => {
    onOpen();
    setIsShow(true);
  };

  const handleClosePopup = () => {
    onClose();
    setIsShow(false);
  };

  return (
    <div>
      <Button disabled={isShow} text={buttonText} onClick={handleOpenPopup} />
      <div className={`${s.popup} ${isShow ? s.active : ''}`} ref={ref}>
        <div className={s.popup__body}>
          <Button className={`${s.popup__close} ${buttonClassName}`} onClick={handleClosePopup} text='X' />
          {renderBody(setIsShow)}
        </div>
      </div>
      <div className={s.popup__shadow} />
    </div>
  );
};
export default Popup;
