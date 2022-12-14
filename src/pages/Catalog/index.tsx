import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { routes } from '../../data';
import { catalog } from '../../data/catalogItem';

import s from './Catalog.module.scss';

const Catalog: FC = () => {
  const navigate = useNavigate();

  const onOpenProduct = (id: any) => {
    navigate(routes.catalog + '/' + id);
  };

  return (
    <div>
      <div className="container">
        <Title text="Каталог" className={s.title} />
        <Title
          text="В данном разделе вы можете выбрать уже готовый вариант, рассчитанный через наш калькулятор."
          className={[s.title, s.subTitle].join(' ')}
        />
        <br />
        <br />
        <br />
        <div className={s.productList}>
          {catalog.map((item, inx) => (
            <div key={item.id} onClick={() => onOpenProduct(inx)} className={s.product}>
              <div className={s.name}>{item.name}</div>
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
