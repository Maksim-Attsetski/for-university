import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { routes } from '../../data';

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
          text="В данном разделе вы можете выбрать уже готовый вариант, рассчитанный через наш калькулятор и добавить его в свои проекты."
          className={[s.title, s.subTitle].join(' ')}
        />
        <br />
        <br />
        <br />
        <div className={s.productList}>
          {Array.from([1, 2, 3]).map(item => (
            <div onClick={() => onOpenProduct(item)} className={s.product}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
