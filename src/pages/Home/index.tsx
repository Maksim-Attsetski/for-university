import { FC } from 'react';

import { Title } from '../../components';

import { useTypedSelector } from '../../hooks/redux';

import './Home.scss';

const Home: FC = () => {
  const { currentUser, isAuth } = useTypedSelector(state => state.auth);

  return (
    <div className='container content'>
      <br />
      <Title
        text={
          isAuth
            ? currentUser
              ? `Привет, ${currentUser.displayName}`
              : `Привет, кто-то без имени`
            : `Вы не авторизованы`
        }
      />
      <p>Здесь будет что-то интересное о нашем сайте</p>
    </div>
  );
};
export default Home;
