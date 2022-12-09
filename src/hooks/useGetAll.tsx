import { useEffect } from 'react';

import { auth } from '../firebase';

import { IUser } from '../types';
import { checkIsAdmin } from '../utils/checkIsAdmin';
import { useActions } from './useActions';
import useProjects from '../hooks/useProjects';

export const useGetAll = () => {
  const { action, getExchangeRate } = useActions();
  const { onGetProjects } = useProjects();

  const getAll = async () => {
    const [rates] = await Promise.all([getExchangeRate(), onGetProjects()]);
    await action.setSystemPrice();
    await action.setWorks();

    action.setExchangeRate(rates);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(data => {
      if (data) {
        const { displayName, email, emailVerified, phoneNumber, photoURL, providerData, uid } = data;

        const isAdmin = checkIsAdmin(email);

        const userData = {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          providerData,
          uid,
          role: isAdmin ? 'admin' : 'user',
        } as IUser;

        getAll();
        action.setUser(userData);
      } else {
        action.setUser(null);
      }

      action.setAppLoading(false);
      action.setIsLoading(false);
      action.setAuth(!!data);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
