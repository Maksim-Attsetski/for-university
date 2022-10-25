import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../data';
import { routeNames } from '../../types';
import s from './Header.module.scss';

interface ILink {
  to: routeNames;
  name: string;
  isActive: boolean;
}

const Header = () => {
  const { pathname } = useLocation();
  const checkIsActive = (link: routeNames) => pathname === link;

  const links: ILink[] = useMemo(
    () => [
      { to: routes.home, name: 'Главная', isActive: checkIsActive(routes.home) },
      { to: routes.about, name: 'О проекте', isActive: checkIsActive(routes.about) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <header className={s.header}>
      <div className={'container'}>
        {links.map(({ to, name, isActive }) => (
          <Link key={to} to={to} className={`${isActive ? s.active : ''} ${s.link}`}>
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
};
export default Header;
