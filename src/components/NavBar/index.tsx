import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { routeNames } from '../../types';
import './NavBar.scss';

interface ILink {
  to: routeNames;
  name: string;
}

interface IProps {
  title: string | null;
  links: ILink[];
}

const NavBar: FC<IProps> = ({ links, title }) => {
  const { isShow, setIsShow, ref } = useOutsideMenu();
  const [refWidth, setRefWidth] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleClickNavbarLink = async (link: string) => {
    setIsShow(false);
    navigate(link);
  };

  useEffect(() => {
    if (!ref.current) return;

    const div: HTMLDivElement = ref.current;
    if (div.offsetWidth > 50 && !refWidth) setRefWidth(div.offsetWidth);

    div.style.width = isShow ? `${refWidth}px` : '50px';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <>
      <div ref={ref} className={`navbar ${isShow ? 'active' : ''}`}>
        <button onClick={() => setIsShow(prev => !prev)}>{isShow ? 'O' : 'X'}</button>
        <br />
        <div className='navbar__body'>
          {title && <h3 className='navbar__title'>{title}</h3>}
          <br />
          <br />
          <div className='navbar-links'>
            {links.map(link => (
              <div key={link.to} className='navbar-links__link' onClick={() => handleClickNavbarLink(link.to)}>
                {link.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='navbar__blur' />
    </>
  );
};
export default NavBar;
