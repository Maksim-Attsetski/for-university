import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

import { setAppLoading, setIsLoading } from '../redux/slices/app';
import { setAuth, setUser } from '../redux/slices/auth';
import { setExchangeRate, getExchangeRate } from '../redux/slices/exchangeRate';
import { updateWorkAC } from '../redux/slices/work';
import { setProjects, deleteProject, addProject } from '../redux/slices/projects';

import { useTypedDispatch } from './redux';

export const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = useMemo(
    () => ({
      setAuth,
      updateWorkAC,
      setUser,
      setAppLoading,
      setIsLoading,
      setExchangeRate,
      setProjects,
      deleteProject,
      addProject,
      getExchangeRate,
    }),
    []
  );

  const action = useMemo(() => bindActionCreators({ ...allActions }, dispatch), [allActions, dispatch]);

  return {
    ...allActions,
    action,
  };
};
