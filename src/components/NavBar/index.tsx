import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { routeNames } from '../../types';
import s from './NavBar.module.scss';

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
      <div ref={ref} className={`${s.navbar} ${isShow ? s.active : ''}`}>
        <button onClick={() => setIsShow(prev => !prev)}>{isShow ? 'O' : 'X'}</button>
        <br />
        <div className={s.navbar__body}>
          {title && <h3 className={s.navbar__title}>{title}</h3>}
          <br />
          <div className={s.navbarLinks}>
            {links.map(link => (
              <div key={link.to} className={s.navbarLinks__link} onClick={() => handleClickNavbarLink(link.to)}>
                {link.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.navbar__blur} />
    </>
  );
};
export default NavBar;
