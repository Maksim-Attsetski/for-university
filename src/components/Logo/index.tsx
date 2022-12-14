import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { routes } from '../../data';
import s from './Logo.module.scss';
import { images } from '../../assets';

const Logo: FC = () => {
  return (
    <div>
      <Link to={routes.home} className={s.logo}>
        <img src={images.logo} alt="logo" />
        <p className={s.logoText}>
          Num<span>BER</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
