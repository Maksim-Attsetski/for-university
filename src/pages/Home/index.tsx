import { FC } from 'react';

import { Button, Title } from '../../components';
import { routes } from '../../data';
import { auth } from '../../firebase';

import { useTypedSelector } from '../../hooks/redux';

import './Home.scss';

const Home: FC = () => {
  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    <div className='container content'>
      <br />
      <Title
        text={
          isAuth
            ? auth?.currentUser?.displayName
              ? `Привет, ${auth.currentUser.displayName}`
              : `Привет, кто-то без имени`
            : `Вы не авторизованы`
        }
      />
      <p>Здесь будет что-то интересное о нашем сайте</p>
      <br />
      {isAuth && <Button text='Перейти к викторинам' to={routes.quiz} />}
    </div>
  );
};
export default Home;
