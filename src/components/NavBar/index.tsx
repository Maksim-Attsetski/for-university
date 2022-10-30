import { motion, useReducedMotion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { routeNames } from '../../types';
import Title from '../Title';
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
  const navigate = useNavigate();

  const handleClickNavbarLink = async (link: string) => {
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
    [closedX, isShow]
  );

  const blurAnimation = useMemo(
    () => ({
      height: isShow ? '110vh' : '20px',
      width: isShow ? '110vw' : '20px',
      borderRadius: isShow ? 0 : '50%',
    }),
    [isShow]
  );

  return (
    <>
      <motion.button
        className={s.navbar__btn}
        onClick={() => setIsShow(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-open={isShow}
      >
        <span className={s.firstLine} />
        <span className={s.secondLine} />
        <span className={s.thirdLine} />
      </motion.button>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: closedX }}
        animate={sideBarAnimation}
        transition={{ type: 'spring', stiffness: 120, duration: 0.3 }}
        className={s.navbar}
      >
        {title && <Title text={title} className={s.navbar__title} />}
        <ul>
          {links.map(link => (
            <li key={link.to} className={s.navbarLinks__link} onClick={() => handleClickNavbarLink(link.to)}>
              {link.name}
            </li>
          ))}
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
