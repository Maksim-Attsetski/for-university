import React, { FC } from 'react';
import { Button, Title } from '../../components';
import { routes } from '../../data';

// import s from './Settings.module.scss';

const Settings: FC = () => {
  return (
    <div>
      <br />
      <div className="container">
        <Title text="Настройки" />
        <br />
        <div>
          <Button text="Настройки аккаунта" to={routes.profile} />
          <br />
          <br />
          <Button text="Изменить валюту" to={routes.exchangeRate} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
