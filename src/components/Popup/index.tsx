import { FC, ReactNode } from 'react';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import './Popup.scss';

interface IProps {
  links?: string[];
  children: ReactNode;
}

const Popup: FC<IProps> = ({ children }) => {
  const { isShow, setIsShow, ref } = useOutsideMenu();

  return (
    <div>
      <button disabled={isShow} onClick={() => setIsShow(true)}>
        open
      </button>
      <br />
      <br />

      <div className={`list ${isShow ? 'active' : ''}`} ref={ref}>
        <div className='list__body'>
          <button onClick={() => setIsShow(false)}>close</button>
          <br />
          {children}
        </div>
      </div>
      <div className='list__shadow' />
    </div>
  );
};
export default Popup;
