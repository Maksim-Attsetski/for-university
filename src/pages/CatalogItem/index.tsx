import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Title } from '../../components';

import s from './CatalogItem.module.scss';

const CatalogItem: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="container">
        <Title className={s.title} text="catalog item" />
        <br />
        order: {id}
        <br />
      </div>
    </div>
  );
};

export default CatalogItem;
