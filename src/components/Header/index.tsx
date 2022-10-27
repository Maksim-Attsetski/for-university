import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../data';
import { auth } from '../../firebase';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import { routeNames } from '../../types';
import s from './Header.module.scss';

interface ILink {
  to: routeNames;
  name: string;
  isActive: boolean;
}

const Header = () => {
  const { pathname } = useLocation();
  const { currentUser, isAuth } = useTypedSelector(state => state.auth);
  const { appLoading, isLoading } = useTypedSelector(state => state.app);
  const { action } = useActions();
  const navigate = useNavigate();
  const checkIsActive = (link: routeNames) => pathname === link;

  const links: ILink[] = useMemo(
    () => {
      const allRoutes = [
        { to: routes.home, name: 'Главная', isActive: checkIsActive(routes.home) },
        { to: routes.about, name: 'О проекте', isActive: checkIsActive(routes.about) },
      ];

      return isAuth
        ? [...allRoutes, { to: routes.exchangeRate, name: 'Курсы валют', isActive: checkIsActive(routes.exchangeRate) }]
        : [...allRoutes];
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
        <div>
          {links.map(({ to, name, isActive }) => (
            <Link key={to} to={to} className={`${isActive ? s.active : ''} ${s.link}`}>
              {name}
            </Link>
          ))}
        </div>
        {(!appLoading || !isLoading) && (
          <div className={s.account} onClick={onLogOut}>
            {isAuth ? 'Выйти' : 'Войти'}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
