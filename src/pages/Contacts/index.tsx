import React, { FC } from 'react';
import { Title } from '../../components';

import s from './Contacts.module.scss';

const Contacts: FC = () => {
  return (
    <div>
      <br />
      <div className="container">
        <Title text="Наши контакты" />
        <br />
        <div>Project manager - Ivanov Kirill</div>
        <br />
        <div>Web developer - Attsetski Maxim</div>
      </div>
    </div>
  );
};

export default Contacts;
