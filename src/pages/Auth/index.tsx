import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';
import { useActions } from '../../hooks/useActions';
import { Button, Input } from '../../components';

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
      console.log(Object.values(form));
      const values = Object.values(form);
      if (!values.every(el => !!el) || values.length < 3) return;
      action.setIsLoading(true);

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      !isLogin &&
        updateProfile(res.user, {
          displayName: form.name,
        });

      action.setUser(res.user);
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
      <h2 onClick={() => setIsLogin(prev => !prev)}>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</h2>
      <br />
      <hr />
      <br />
      {!isLogin && (
        <>
          <Input setText={name => setForm({ ...form, name })} text={form.name} placeholder='Your name' required />
          <br />
          <br />
        </>
      )}
      <Input setText={email => setForm({ ...form, email })} text={form.email} placeholder='Email' required />
      <br />
      <br />
      <Input setText={pass => setForm({ ...form, pass })} text={form.pass} placeholder='Pass' required />
      <br />
      <Button onClick={onAuth} text={isLogin ? 'Войти' : 'Зарегаться'} />
    </div>
  );
};

export default Auth;
