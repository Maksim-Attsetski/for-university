import { FC } from 'react';

import { useTypedSelector } from '../../hooks/redux';

import s from './Loader.module.scss';

const Loader: FC = () => {
  const { appLoading, isLoading } = useTypedSelector(state => state.app);

  return appLoading || isLoading ? (
    <div className={s.page}>
      <div className={s.ldsFacebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loader;
