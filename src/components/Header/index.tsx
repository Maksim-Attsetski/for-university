import { FC, useMemo } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import { routeNames } from '../../types';
import { routes } from '../../data';

import Button from '../Button';
import NavBar from '../NavBar';
import Logo from '../../assets/logo.png';
import s from './Header.module.scss';
import Select, { IOption } from '../Select';

interface ILink {
  to: routeNames;
  name: string;
  isActive: boolean;
}

const Header: FC = () => {
  const { pathname } = useLocation();
  const { isAuth } = useTypedSelector(state => state.auth);
  const { onLogOutBtnClick } = useAuth();
  const navigate = useNavigate();
  const checkIsActive = (link: routeNames) => pathname === link;

  const links: ILink[] = useMemo(
    () => {
      const allRoutes: ILink[] = [{ to: routes.about, name: 'О проекте', isActive: checkIsActive(routes.about) }];

      const privateRoutes: ILink[] = [
        {
          to: routes.exchangeRate,
          name: 'Курсы валют',
          isActive: checkIsActive(routes.exchangeRate),
        },
      ];

      return isAuth ? [...allRoutes, ...privateRoutes] : [...allRoutes];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const options: IOption[] = useMemo(
    () => [
      { title: 'Аккаунт', onClick: () => navigate(routes.profile), icon: null },
      { title: 'Настройки', onClick: () => navigate(routes.profile), icon: null },
      { title: 'Выйти', onClick: onLogOutBtnClick, isButton: true, icon: null },
    ],
    [],
  );

  return (
    <header className={s.header}>
      <div className={s.blur} />
      <div className={'container ' + s.headerBody}>
        <Link to={routes.home} className={s.logo}>
          <img src={Logo} alt="logo" />
          <p className={s.logoText}>
            Num<span>BER</span>
          </p>
        </Link>
        <div className={s.headerContent}>
          <div className="links">
            {links.map(({ to, name, isActive }) => (
              <Link key={to} to={to} className={`${isActive ? s.active : ''} ${s.link}`}>
                {name}
                <span className={s.linkLine} />
              </Link>
            ))}
          </div>
          <div className="burger">
            <NavBar links={links} title="Наш сайт" />
          </div>
          {isAuth ? (
            <div className="links">
              <Select title="Профиль" options={options} containerClassName={s.select} />
              <Select title="" options={[]} containerClassName={s.selectDisabled} />
            </div>
          ) : (
            <Button onClick={() => navigate(routes.auth)} text={'Войти'} className="links" />
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
