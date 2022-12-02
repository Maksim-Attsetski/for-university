import { FC, useState } from 'react';

import { AnimationProps, motion } from 'framer-motion';

import { Blur, Button, Input, Title, Toast } from '../../components';

import { useAuth } from '../../hooks/useAuth';
import { useWidth } from '../../hooks/useWidht';

import { images } from '../../assets';
import s from './Auth.module.scss';

interface IForm {
  email: string;
  pass: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [form, setForm] = useState<IForm>({ email: '', pass: '' });
  const [error, setError] = useState<string | null>(null);
  const { onAuth, onGoogleAuth } = useAuth(setForm, setError);
  const { width } = useWidth();

  const animation: AnimationProps =
    width > 768
      ? {
          animate: { x: isLogin ? '80%' : '15%' },
          initial: { x: isLogin ? '80%' : '15%' },
          transition: { duration: 0.6, type: 'spring' },
        }
      : {};

  const leftButton: AnimationProps = {
    animate: { opacity: isLogin ? 1 : 0, y: isLogin ? 0 : 100 },
    initial: { opacity: isLogin ? 1 : 0, y: isLogin ? 0 : 100 },
    transition: { duration: 0.2, type: 'spring' },
  };

  const rightButton: AnimationProps = {
    animate: { opacity: isLogin ? 0 : 1, y: isLogin ? 100 : 0 },
    initial: { opacity: isLogin ? 0 : 1, y: isLogin ? 100 : 0 },
    transition: { duration: 0.2, type: 'spring' },
  };

  return (
    <div className={s.authPage}>
      <div className="container">
        <br />
        <Toast data={error} isError setData={setError} />
        <div className={s.wrapper}>
          <motion.div {...leftButton} className={[s.buttonsContainer, s.left].join(' ')}>
            <p>Нет аккаунта?</p>
            <Button text="Создай" onClick={() => setIsLogin(prev => !prev)} />
          </motion.div>
          <motion.div {...rightButton} className={[s.buttonsContainer, s.right].join(' ')}>
            <p>Уже есть аккаунт?</p>
            <Button onClick={() => setIsLogin(prev => !prev)} text="Войди" />
          </motion.div>
          <Blur />
          <motion.form {...animation} className={s.authForm} onSubmit={e => e.preventDefault()}>
            <Title text={isLogin ? 'Вход' : 'Регистрация'} className="mt-2 mb-10" />
            <Input
              type="email"
              setText={email => setForm({ ...form, email })}
              text={form.email}
              placeholder="Email"
              required
              containerClassName={s.input}
            />
            <Input
              isPass
              setText={pass => setForm({ ...form, pass })}
              text={form.pass}
              containerClassName={s.input}
              placeholder="Пароль"
              required
            />
            <Button onClick={() => onAuth(form, isLogin)} text={isLogin ? 'Войти' : 'Зарегистрироваться'} />
            <Button onClick={onGoogleAuth} image={images.google} text={'Продолжить с Google'} isSecondary />

            <div className={s.formQuestion}>
              <Button
                text={isLogin ? 'Нет аккаунта? Создай' : 'Уже есть аккаунт? Войди'}
                onClick={() => setIsLogin(prev => !prev)}
              />
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
