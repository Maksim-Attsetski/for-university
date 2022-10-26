import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';

interface IForm {
  email: string;
  pass: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({} as IForm);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const onAuth = async () => {
    try {
      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);
      setUser(res.user);
      navigate(routes.home);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div>
      <h2 onClick={() => setIsLogin(prev => !prev)}>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</h2>
      <br />
      <hr />
      <br />
      <input type='text' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type='text' value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} />
      <br />
      <button onClick={onAuth}>{isLogin ? 'Войти' : 'Зарегаться'}</button>
    </div>
  );
};

export default Auth;
