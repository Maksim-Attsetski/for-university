import { FC, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

import Button from '../Button';
import NavBar from '../NavBar';

import { auth } from '../../firebase';
import { routes } from '../../data';
import { routeNames } from '../../types';
import s from './Header.module.scss';

interface ILink {
  to: routeNames;
  name: string;
  isActive: boolean;
}

const Header: FC = () => {
  const { pathname } = useLocation();
  const { isAuth } = useTypedSelector(state => state.auth);
  const { action } = useActions();
  const navigate = useNavigate();
  const checkIsActive = (link: routeNames) => pathname === link;

  const links: ILink[] = useMemo(
    () => {
      const allRoutes: ILink[] = [
        { to: routes.home, name: 'Главная', isActive: checkIsActive(routes.home) },
        { to: routes.about, name: 'О проекте', isActive: checkIsActive(routes.about) },
      ];

      const privateRoutes: ILink[] = [
        { to: routes.exchangeRate, name: 'Курсы валют', isActive: checkIsActive(routes.exchangeRate) },
        { to: routes.profile, name: 'Профиль', isActive: checkIsActive(routes.profile) },
      ];

      return isAuth ? [...allRoutes, ...privateRoutes] : [...allRoutes];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  const onLogOut = async () => {
    try {
      action.setIsLoading(true);
      if (isAuth) {
        await auth.signOut();
        action.setUser(null);
        action.setAuth(false);
        navigate(routes.home);
      } else {
        navigate(routes.auth);
      }
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  return (
    <header className={s.header}>
      <div className={'container ' + s.headerBody}>
        <div className='links'>
          {links.map(({ to, name, isActive }) => (
            <Link key={to} to={to} className={`${isActive ? s.active : ''} ${s.link}`}>
              {name}
            </Link>
          ))}
        </div>
        <div className='burger'>
          <NavBar links={links} title='Наш сайт' />
        </div>
        <Button onClick={onLogOut} text={isAuth ? 'Выйти' : 'Войти'} />
      </div>
    </header>
  );
};
export default Header;
