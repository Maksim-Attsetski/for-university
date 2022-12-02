import { FC, useMemo } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import { routes } from '../../data';

import Button from '../Button';
import NavBar from '../NavBar';
import Logo from '../Logo';
import Select, { IOption } from '../Select';

import s from './Header.module.scss';
import { images } from '../../assets';

interface ILink {
  to: routes;
  name: string;
  isActive: boolean;
}

const Header: FC = () => {
  const { pathname } = useLocation();
  const { isAuth, currentUser } = useTypedSelector(state => state.auth);
  const { onLogOutBtnClick } = useAuth();
  const navigate = useNavigate();
  const checkIsActive = (link: routes) => pathname === link;

  const avatar = useMemo(
    () => (!!currentUser?.photoURL ? currentUser.photoURL : images.profile),
    [currentUser?.photoURL],
  );

  const links: ILink[] = useMemo(
    () => {
      const allRoutes: ILink[] = [
        { to: routes.about, name: 'О проекте', isActive: checkIsActive(routes.about) },
        { to: routes.catalog, name: 'Каталог', isActive: checkIsActive(routes.catalog) },
        { to: routes.contacts, name: 'Наши контакты', isActive: checkIsActive(routes.contacts) },
      ];

      const privateRoutes: ILink[] = [
        // { to: routes.projects, name: 'Мои проекты', isActive: checkIsActive(routes.projects) },
      ];

      return isAuth ? [...allRoutes, ...privateRoutes] : [...allRoutes];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const options: IOption[] = useMemo(
    () => [
      { title: 'Аккаунт', onClick: () => navigate(routes.profile), icon: null },
      { title: 'Мои проекты', onClick: () => navigate(routes.projects), icon: null },
      { title: 'Курсы валют', onClick: () => navigate(routes.exchangeRate), icon: null },
      { title: 'Выйти', onClick: onLogOutBtnClick, isButton: true, icon: null },
    ],
    [],
  );

  return (
    <header className={s.header}>
      <div className={s.blur} />
      <div className={'container ' + s.headerBody}>
        <Logo />
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
            <NavBar links={links} />
          </div>
          {isAuth ? (
            <div className="links">
              <Select
                title={<img src={avatar} alt="profile" />}
                options={options}
                containerClassName={s.select}
                titleClassName={s.selectTitle}
                optionClassName={'text-center'}
              />
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
