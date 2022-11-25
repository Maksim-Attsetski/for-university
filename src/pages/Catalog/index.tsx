import React, { FC } from 'react';
import { Title } from '../../components';

import s from './Catalog.module.scss';

const Catalog: FC = () => {
  return (
    <div>
      <div className="container">
        <Title text="Каталог" className={s.title} />
      </div>
    </div>
  );
};

export default Catalog;
