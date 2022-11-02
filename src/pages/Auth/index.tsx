import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';
import { useActions } from '../../hooks/useActions';
import { Button, Input, Title, Toast } from '../../components';
import { getErrorMsg } from '../../utils';

import s from './Auth.module.scss';
import { checkIsAdmin } from '../../utils/checkIsAdmin';
import { IUser } from '../../types';

interface IForm {
  email: string;
  pass: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [form, setForm] = useState<IForm>({ email: '', pass: '' });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { action } = useActions();

  const onAuth = async () => {
    try {
      action.setIsLoading(true);

      if (Object.values(form).some(el => !el)) {
        setError(getErrorMsg('empty value'));
        return;
      }

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      if (res.user) {
        const { email, displayName, emailVerified, phoneNumber, photoURL, providerData, uid } = res.user;
        const isAdmin = checkIsAdmin(form.email);

        const userData = { email, displayName, emailVerified, phoneNumber,
          photoURL, providerData, uid, role: isAdmin ? 'admin' : 'user' } as IUser;

        action.setUser(userData);
      } else {
        action.setUser(null);
      }

      navigate(routes.home);
      setForm({ email: '', pass: '' });
    } catch (error) {
      console.log(error);

      setError(getErrorMsg(error));
    } finally {
      action.setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <br />
      <Title text={isLogin ? 'Войдите в свой аккаунт' : 'Регистрация'} className='mb-2' />
      <Toast data={error} isError setData={setError} />
      <form className={s.authForm}>
        <Input
          type='email'
          setText={email => setForm({ ...form, email })}
          text={form.email}
          placeholder='Email'
          required
        />
        <Input isPass setText={pass => setForm({ ...form, pass })} text={form.pass} placeholder='Пароль' required />
      </form>
      <hr className='my-4' />
      <div className={s.buttonsContainer}>
        <Button onClick={onAuth} text={isLogin ? 'Войти' : 'Зарегаться'} />
        <button onClick={() => setIsLogin(prev => !prev)} className='underline'>
          {isLogin ? 'Нет аккаунта? Создай' : 'Уже есть аккаунт? Войди'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
