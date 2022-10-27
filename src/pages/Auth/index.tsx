import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import { Input } from '../../components';

interface IForm {
  email: string;
  pass: string;
  name: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({} as IForm);
  const { isLoading, appLoading } = useTypedSelector(state => state.app);
  const { currentUser } = useTypedSelector(state => state.auth);

  const navigate = useNavigate();
  const { action } = useActions();

  const onAuth = async () => {
    try {
      action.setIsLoading(true);

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      action.setUser(res.user);
      navigate(routes.home);
      setForm({ email: '', name: '', pass: '' });
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onUpdateName = async () => {
    try {
      action.setIsLoading(true);
      if (!currentUser) return;

      // updateEmail(auth.currentUser, "user@example.com").

      // const newPassword = getASecureRandomPassword();
      // updatePassword(user, newPassword)

      // deleteUser(user)

      updateProfile(currentUser, {
        displayName: form.name,
        //  photoURL:
      });

      navigate(routes.home);
      setForm({ email: '', name: '', pass: '' });
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  return isLoading || appLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='container'>
      <br />
      <Input setText={name => setForm({ ...form, name })} text={form.name} placeholder='Name' required />
      <button onClick={onUpdateName}>Обновить имя</button>
      <hr />
      <br />
      <br />
      <h2 onClick={() => setIsLogin(prev => !prev)}>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</h2>
      <br />
      <hr />
      <br />
      <Input setText={email => setForm({ ...form, email })} text={form.email} placeholder='Email' required />
      <br />
      <br />
      <Input setText={pass => setForm({ ...form, pass })} text={form.pass} placeholder='Pass' required />
      <br />
      <button onClick={onAuth}>{isLogin ? 'Войти' : 'Зарегаться'}</button>
    </div>
  );
};

export default Auth;
