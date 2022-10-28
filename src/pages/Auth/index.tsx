import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';
import { useActions } from '../../hooks/useActions';
import { Button, Input } from '../../components';

import s from './Auth.module.scss';

interface IForm {
  email: string;
  pass: string;
  name: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({ email: '', name: '', pass: '' });

  const navigate = useNavigate();
  const { action } = useActions();

  const onAuth = async () => {
    try {
      const firstCondition = Object.values(form).every(el => !!el) && !isLogin;
      const secondCondition = isLogin && form.email.length > 0 && form.pass.length > 0;

      if (!firstCondition && !secondCondition) return;
      action.setIsLoading(true);

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      !isLogin && (await updateProfile(res.user, { displayName: form.name || 'xxx' }));

      if (res.user) {
        const { displayName, email, emailVerified, phoneNumber, photoURL, providerData, uid } = res.user;
        const userData = { displayName, email, emailVerified, phoneNumber, photoURL, providerData, uid } as User;

        action.setUser(userData);
      } else {
        action.setUser(null);
      }
      navigate(routes.home);
      setForm({ email: '', name: '', pass: '' });
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  // updateEmail(auth.currentUser, "user@example.com").

  // const newPassword = getASecureRandomPassword();
  // updatePassword(user, newPassword)

  // deleteUser(user)

  return (
    <div className='container'>
      <br />
      <form className={s.authForm}>
        {!isLogin && (
          <Input setText={name => setForm({ ...form, name })} text={form.name} placeholder='Введи своё имя' required />
        )}
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
        <Button
          text={isLogin ? 'Нет аккаунта? Создай' : 'Уже есть аккаунт? Войди'}
          onClick={() => setIsLogin(prev => !prev)}
        />
      </div>
    </div>
  );
};

export default Auth;
