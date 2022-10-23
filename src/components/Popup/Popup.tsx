import { FC } from 'react';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import './Popup.scss';

interface IProps {
  links: string[];
}

const Popup: FC<IProps> = ({ links }) => {
  const { isShow, setIsShow, ref } = useOutsideMenu();

  return (
    <div className='container'>
      <button disabled={isShow} onClick={() => setIsShow(true)}>
        open
      </button>
      <br />
      <br />

      <div className={`list ${isShow ? 'active' : ''}`} ref={ref}>
        <div className='list__body'>
          <button onClick={() => setIsShow(false)}>close</button>
          {links.map(link => (
            <div key={link} onClick={() => console.log(link)}>
              {link}
            </div>
          ))}
        </div>
      </div>
      <div className='list__shadow' />
    </div>
  );
};
export default Popup;
