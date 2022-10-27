import { FC } from 'react';

import { Link } from 'react-router-dom';

import { routes } from '../../data';

import s from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <div className={'container ' + s.notFoundContainer}>
      <p>
        Page is <strong>not found</strong>
      </p>
      <Link to={routes.home} className={s.link}>
        Домой
      </Link>
    </div>
  );
};

export default NotFound;
