import { FC, useMemo } from 'react';
import { images } from '../../assets';
import { Title } from '../../components';

import s from './About.module.scss';

const About: FC = () => {
  const strengths = useMemo(
    () => [
      'Дружелюбный к рядовому пользователю интерфейс',
      'Мгновенный ответ по заданным расчётам',
      'Актуальный конвертер валют',
      'Возможность создать, отслеживать с любого момента и завершить ваш проект',
    ],
    [],
  );

  return (
    <div className={s.about}>
      <img src={images.aboutBg} className={s.bg} alt="about bg" />
      <div className="container">
        <br />
        <Title text="О Number" />
        <br />
        <div className={s.description}>
          <p className="font-semibold">
            Number - универсальный сервис, представляющий собой онлайн калькулятор для расчёта стоимости и длительности
            строительных работ.
          </p>
          <p>
            Надежность - наше главное качество, рассчет производится от земляных, до кровли, разработанный по стандартам
            ЕНиР (от 1986 г.). Наш сервис отличается удобством и актуальностью, от стандартов ЕНиР, СНиП, до интерфейса
            и формулировок.
          </p>
          <p>
            Онлайн калькулятор сводит задачу долгих расчетов до минимума, что значительно экономит время. Здесь Вы
            сможете сохранить и распечатать свои полученные данные.
          </p>
        </div>
        <div className={s.strengths}>
          <div className={s.title}>Преимущества нашего сервиса:</div>
          <div>
            {strengths.map(item => (
              <div className={s.strengths_item}>
                <img src={images.star} alt="star" />
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <p className="text-center mb-3">
          Наш сервис находится в разработке. Пожалуйста, сообщайте о найденных ошибках на почту.
          <br /> Благодарим Вас за обратную связь.
        </p>
      </div>
    </div>
  );
};
export default About;
