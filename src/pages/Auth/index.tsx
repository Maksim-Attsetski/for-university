import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../firebase';

import { routes } from '../../data';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setUser, setAuth } from '../../redux/slices/auth';
import { setAppLoading, setIsLoading } from '../../redux/slices/app';

interface IForm {
  email: string;
  pass: string;
}

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({} as IForm);
  const { isLoading, appLoading } = useTypedSelector(state => state.app);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const onAuth = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      setUser(res.user);
      navigate(routes.home);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(data => {
      const userData = { ...data?.providerData[0] } as User;
      dispatch(setUser(userData || null));
      dispatch(setAuth(!!data));
      dispatch(setAppLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return isLoading || appLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='container'>
      <h2 onClick={() => setIsLogin(prev => !prev)}>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</h2>
      <br />
      <hr />
      <br />
      <input
        type='text'
        placeholder='Email'
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <br />
      <input
        type='text'
        placeholder='Pass'
        value={form.pass}
        onChange={e => setForm({ ...form, pass: e.target.value })}
      />
      <br />
      <button onClick={onAuth}>{isLogin ? 'Войти' : 'Зарегаться'}</button>
    </div>
  );
};

export default Auth;
