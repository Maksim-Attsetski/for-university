import { FC, useMemo } from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';
import useOutsideMenu from '../../hooks/useOutsideMenu';

import { routeNames } from '../../types';

import s from './NavBar.module.scss';
import Button from '../Button';
import Logo from '../Logo';
import Select, { IOption } from '../Select';

interface ILink {
  to: routeNames;
  name: string;
}

interface IProps {
  links: ILink[];
}

const NavBar: FC<IProps> = ({ links }) => {
  const { isShow, setIsShow, ref } = useOutsideMenu();
  const { isAuth } = useTypedSelector(state => state.auth);
  const { onLogOutBtnClick } = useAuth();
  const navigate = useNavigate();

  const handleClickNavbarLink = async (link: routeNames) => {
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

  const options: IOption[] = useMemo(
    () => [
      { title: 'Аккаунт', onClick: () => handleClickNavbarLink('/profile'), icon: null },
      { title: 'Мои проекты', onClick: () => handleClickNavbarLink('/projects'), icon: null },
      { title: 'Курсы валют', onClick: () => handleClickNavbarLink('/exchangeRate'), icon: null },
      { title: 'Выйти', onClick: onLogOutBtnClick, isButton: true, icon: null },
    ],
    [],
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
        <div onClick={() => handleClickNavbarLink('/')}>
          <Logo />
        </div>
        <ul>
          {links.map(link => (
            <li key={link.to} className={s.navbarLinks__link} onClick={() => handleClickNavbarLink(link.to)}>
              {link.name}
            </li>
          ))}
          {isAuth ? (
            <Select
              containerClassName={s.profile}
              titleClassName={s.profileTitle}
              optionClassName={s.profileOption}
              options={options}
              title="Профиль"
            />
          ) : (
            <Button text="Войти" onClick={() => handleClickNavbarLink('/auth')} />
          )}
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
