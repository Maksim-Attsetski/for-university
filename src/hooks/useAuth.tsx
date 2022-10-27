import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useActions } from './useActions';

export const useAuth = () => {
  const { action } = useActions();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(data => {
      action.setAppLoading(false);
      action.setIsLoading(false);

      const userData = { ...data?.providerData[0] } as User;
      action.setUser(userData || null);
      action.setAuth(!!data);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
