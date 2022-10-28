import { FC } from 'react';

import { useTypedSelector } from '../../hooks/redux';

import './Home.scss';

const Home: FC = () => {
  const { currentUser, isAuth } = useTypedSelector(state => state.auth);

  return (
    <div className='container content'>
      <br />
      {isAuth ? <p>Привет, {currentUser ? currentUser.displayName : 'Нет имени'}</p> : <p>Вы не авторизованы</p>}
    </div>
  );
};
export default Home;
