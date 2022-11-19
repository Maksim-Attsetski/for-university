import { FC, useState } from 'react';
import s from './Auth.module.scss';

import { Blur, Button, Input, Title, Toast } from '../../components';

import { useAuth } from '../../hooks/useAuth';
interface IForm {
  email: string;
  pass: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [form, setForm] = useState<IForm>({ email: '', pass: '' });
  const [error, setError] = useState<string | null>(null);
  const { onAuth } = useAuth(setForm, setError);

  return (
    <div className="container">
      <br />
      <Toast data={error} isError setData={setError} />
      <div className={s.wrapper}>
        <Title text={isLogin ? 'Войдите в свой аккаунт' : 'Регистрация'} className="mb-2" />
        <form className={s.authForm}>
          <Blur />
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
        </form>
        <hr className="my-4" />
        <div className={s.buttonsContainer}>
          <Button onClick={() => onAuth(form, isLogin)} text={isLogin ? 'Войти' : 'Зарегаться'} />
          <button onClick={() => setIsLogin(prev => !prev)} className="underline">
            {isLogin ? 'Нет аккаунта? Создай' : 'Уже есть аккаунт? Войди'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
