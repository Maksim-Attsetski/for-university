import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Title } from '../../components';
import { routes, catalog } from '../../data';

import s from './Catalog.module.scss';

const Catalog: FC = () => {
  const navigate = useNavigate();

  const onOpenProduct = (id: any) => {
    navigate(routes.catalog + '/' + id);
  };

  return (
    <div>
      <div className="container">
        <br />
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
              <span>
                <img src={item.image} alt={item.name} />
              </span>
              <div className={s.content}>
                <Title className={s.name} text={item.name} />
                <div className="my-2"></div>
                <div>
                  Цена: {item.price} {item.currency}
                </div>
                <div>Площадь: {item.size['Кубатура']}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
