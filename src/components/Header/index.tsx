import { FC } from 'react';

import NavBar from '../NavBar';
import Logo from '../Logo';

import s from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.blur} />
      <div className={'container ' + s.headerBody}>
        <Logo />
        <div className={s.headerContent}>
          <NavBar />
        </div>
      </div>
      <div className={s.line}></div>
    </header>
  );
};
export default Header;
