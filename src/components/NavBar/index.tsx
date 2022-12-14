import { FC, Fragment, useMemo } from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import useOutsideMenu from '../../hooks/useOutsideMenu';

import { routes } from '../../data';

import s from './NavBar.module.scss';
import Button from '../Button';
import Logo from '../Logo';
import { images } from '../../assets';
import React from 'react';

interface ILink {
  to: routes;
  name: string;
  isActive: boolean;
  icon: typeof images.profile;
}

const NavBar: FC = () => {
  const { isShow, setIsShow, ref } = useOutsideMenu();
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
        { to: routes.about, name: 'О NumBer', isActive: checkIsActive(routes.about), icon: images.aboutUs },
        { to: routes.catalog, name: 'Каталог', isActive: checkIsActive(routes.catalog), icon: images.catalog },
        { to: routes.contacts, name: 'Контакты', isActive: checkIsActive(routes.contacts), icon: images.phone },
      ];

      const privateRoutes: ILink[] = [
        { to: routes.projects, name: 'Мои проекты', isActive: checkIsActive(routes.projects), icon: images.folders },
        { to: routes.profile, name: 'Аккаунт', isActive: checkIsActive(routes.profile), icon: images.accountSettings },
        {
          to: routes.exchangeRate,
          name: 'Курсы валют',
          isActive: checkIsActive(routes.exchangeRate),
          icon: images.currencies,
        },
      ];

      return isAuth ? allRoutes.concat(privateRoutes) : allRoutes;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const handleClickNavbarLink = async (link: routes) => {
    setIsShow(false);
    navigate(link);
  };

  const shouldReduceMotion = useReducedMotion();
  const closedX = shouldReduceMotion ? 0 : '-100%';

  const sideBarAnimation = useMemo(
    () => ({
      opacity: isShow ? 1 : 0,
      x: isShow ? 0 : closedX,
    }),
    [closedX, isShow],
  );

  const blurAnimation = useMemo(
    () => ({
      height: isShow ? '110vh' : '20px',
      width: isShow ? '110vw' : '20px',
      borderRadius: isShow ? 0 : '50%',
    }),
    [isShow],
  );

  return (
    <>
      <motion.button
        className={s.navbar__btn}
        onClick={() => setIsShow(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-open={isShow}>
        <span className={s.firstLine} />
        <span className={s.secondLine} />
        <span className={s.thirdLine} />
      </motion.button>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: closedX }}
        animate={sideBarAnimation}
        transition={{ type: 'spring', stiffness: 120, duration: 0.3 }}
        className={s.navbar}>
        <div onClick={() => handleClickNavbarLink(routes.home)}>
          <Logo />
        </div>
        <ul className={s.links}>
          <li className={s.profile}>
            <img src={avatar} alt="profile" />
            <div>{isAuth && currentUser?.displayName ? currentUser?.displayName : 'Профиль'}</div>
          </li>
          {links.map((link, inx) => (
            <Fragment key={link.to}>
              <li className={s.navbarLinks__link} onClick={() => handleClickNavbarLink(link.to)}>
                <img src={link.icon} alt={link.name} />
                <div>{link.name}</div>
              </li>
              {inx % 3 === 2 && <div className={s.underline} />}
            </Fragment>
          ))}
          <Button
            text={isAuth ? 'Выйти' : 'Войти'}
            onClick={() => (isAuth ? onLogOutBtnClick() : handleClickNavbarLink(routes.auth))}
          />
        </ul>
      </motion.div>
      <motion.div
        animate={blurAnimation}
        transition={{ duration: 0.5 }}
        layout
        className={s.child}
        data-open={isShow}
      />
    </>
  );
};
export default NavBar;
