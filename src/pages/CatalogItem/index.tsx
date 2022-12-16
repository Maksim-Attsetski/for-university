/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useMemo } from 'react';
import { Params, useParams } from 'react-router-dom';

import { Button, Title } from '../../components';

import { routes, catalog } from '../../data';
import { ICatalogItem } from '../../types';

import s from './CatalogItem.module.scss';

interface IInfo {
  question: string;
  answer: string;
}

const CatalogItem: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();

  const catalogItem: ICatalogItem | null = useMemo(() => (id ? catalog[+id] : null), [id]);

  const info: { sizes: IInfo[]; materials: IInfo[] } = useMemo(() => {
    const sizes: IInfo[] = [];
    const materials: IInfo[] = [];

    if (!catalogItem) {
      return { sizes: [], materials: [] };
    }

    for (const key in catalogItem.size) {
      // @ts-ignore
      const answer = catalogItem.size[key];
      sizes.push({ question: key, answer });
    }

    for (const key in catalogItem.materials) {
      // @ts-ignore
      const answer = catalogItem.materials[key];
      materials.push({ question: key, answer });
    }

    return { sizes, materials };
  }, [catalogItem]);

  return (
    <div>
      {catalogItem ? (
        <div className="container">
          <Title className={s.title} text={catalogItem?.name} />
          <div className={s.product}>
            <span>
              <img src={catalogItem.image} alt={catalogItem.name} />
            </span>
            <div className={s.content}>
              <Button text="Назад" to={routes.catalog} />
              <div>
                <strong>Стоимость:</strong> {catalogItem.price}
              </div>
              <div>
                <strong>Длительность:</strong> {catalogItem.time}
              </div>
              <div className={s.description}>
                <strong>Описание:</strong> {catalogItem.description}
              </div>
            </div>
          </div>
          <div className={s.info}>
            <div className={s.size}>
              <Title text="Размеры" className={s.name} />
              {info.sizes.map(item => (
                <div key={item.question} className="flex gap-4">
                  <div>{item.question}:</div>
                  <div>{item.answer}</div>
                </div>
              ))}
            </div>
            <div className={s.materials}>
              <Title text="Стройматериалы" className={s.name} />
              {info.materials.map(item => (
                <div key={item.question} className="flex gap-4">
                  <div>{item.question}:</div>
                  <div>{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Такого продукта нет</div>
      )}
    </div>
  );
};

export default CatalogItem;
