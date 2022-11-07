import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import { useTypedSelector } from './redux';

import { useActions } from './useActions';
import { routes } from '../data';
import { getErrorMsg } from '../utils';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { checkIsAdmin } from '../utils/checkIsAdmin';
import { IUser } from '../types';

interface IForm {
  email: string;
  pass: string;
}

interface IOnAuth {
  (form: IForm, isLogin: boolean): Promise<void>;
}

interface IProps {
  (setForm?: (obj: IForm) => void, setError?: (error: string | null) => void): any;
}

export const useAuth: IProps = (setForm, setError) => {
  const { isAuth } = useTypedSelector(state => state.auth);
  const { action } = useActions();
  const navigate = useNavigate();

  const onLogOutBtnClick = async () => {
    try {
      action.setIsLoading(true);
      if (isAuth) {
        await auth.signOut();
        action.setUser(null);
        action.setAuth(false);
        navigate(routes.home);
      } else {
        navigate(routes.auth);
      }
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onAuth: IOnAuth = async (form, isLogin) => {
    try {
      action.setIsLoading(true);

      if (Object.values(form).some(el => !el)) {
        setError && setError(getErrorMsg('empty value'));
        return;
      }

      const res = isLogin
        ? await signInWithEmailAndPassword(auth, form.email, form.pass)
        : await createUserWithEmailAndPassword(auth, form.email, form.pass);

      if (res.user) {
        const { email, displayName, emailVerified, phoneNumber, photoURL, providerData, uid } = res.user;
        const isAdmin = checkIsAdmin(form.email);

        const userData = {
          email,
          displayName,
          emailVerified,
          phoneNumber,
          photoURL,
          providerData,
          uid,
          role: isAdmin ? 'admin' : 'user',
        } as IUser;

        action.setUser(userData);
      } else {
        action.setUser(null);
      }

      navigate(routes.home);
      setForm && setForm({ email: '', pass: '' });
    } catch (error) {
      console.log(error);

      setError && setError(getErrorMsg(error));
    } finally {
      action.setIsLoading(false);
    }
  };

  return {
    onLogOutBtnClick,
    onAuth,
  };
};
