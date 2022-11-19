import { FC, useMemo } from 'react';

import { Select } from '../../components';
import { IOption } from '../../components/Select';

import s from './About.module.scss';

const About: FC = () => {
  // const {app, auth, exchangeRate, projects, works} = useTypedSelector(state => state);

  const options: IOption[] = useMemo(
    () => [
      { title: 'Аккаунт', onClick: () => {} },
      { title: 'Настройки', onClick: () => {} },
      { title: 'Выйти', onClick: () => {} },
    ],
    [],
  );

  return (
    <div className={'container ' + s.about}>
      <br />
      <p>about</p>
      <br />
      <br />
      <Select title="Профиль" options={options} />
    </div>
  );
};
export default About;
