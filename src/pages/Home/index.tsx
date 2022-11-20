import { FC } from 'react';

import s from './Home.module.scss';
import { images } from '../../assets';
import { Button } from '../../components';
import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';

const Home: FC = () => {
  const { isAuth } = useTypedSelector(state => state.auth);
  return (
    <div className={s.home}>
      <br />
      <div className={s.homeLine} />
      <div className={s.container + ' container'}>
        <div className={s.homeBody}>
          <div className={s.content}>
            <div className={s.blur} />
            <div className={s.title}>
              <p>Оцифруем ваши</p>
              <p>желания.</p>
            </div>
            <div className={s.text}>
              <p>Онлайн-калькулятор расчета стоимости</p>
              <p>строительства - удобное решение, когда</p>
              <p>результат нужен здесь и сейчас.</p>
            </div>
            <Button className={s.quizBtn} text="Рассчитать" to={isAuth ? routes.quiz : routes.auth} />
          </div>
          <div className={s.image}>
            <img src={images.mainBgBlock} alt="main-bg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
