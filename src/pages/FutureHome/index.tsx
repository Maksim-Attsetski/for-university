import { FC } from 'react';

import s from './FutureHome.module.scss';
import bgImage from '../../assets/main-bg.png';
import { Button } from '../../components';
import { routes } from '../../data';

const FutureHome: FC = () => {
  return (
    <div className={s.home}>
      <br />
      <div className={s.homeLine} />
      <div className={s.container + ' container'}>
        <div className={s.homeBody}>
          <div className={s.content}>
            <div className={s.title}>
              <p>Оцифруем ваши</p>
              <p>желания.</p>
            </div>
            <div className={s.text}>
              <p>Онлайн-калькулятор расчета стоимости</p>
              <p>строительства - удобное решение, когда</p>
              <p>результат нужен здесь и сейчас.</p>
            </div>
            <Button className={s.quizBtn} text="Рассчитать" to={routes.quiz} />
          </div>
          <div className={s.image}>
            <img src={bgImage} alt="main-bg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureHome;
