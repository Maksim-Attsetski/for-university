import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

import { setAppLoading, setIsLoading } from '../redux/slices/app';
import { setAuth, setUser, updateUserData } from '../redux/slices/auth';
import { setExchangeRate, getExchangeRate, setNewWorkCurrency } from '../redux/slices/exchangeRate';
import { updateWorkAC, updateWorkCurrency } from '../redux/slices/work';
import { setProjects, deleteProject, addProject, updateProject } from '../redux/slices/projects';
import { clearAnswers, setNewAnswer } from '../redux/slices/quiz';

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
      setNewWorkCurrency,
      setProjects,
      deleteProject,
      updateProject,
      addProject,
      updateUserData,
      updateWorkCurrency,
      getExchangeRate,
      setNewAnswer,
      clearAnswers,
    }),
    [],
  );

  const action = useMemo(() => bindActionCreators({ ...allActions }, dispatch), [allActions, dispatch]);

  return {
    ...allActions,
    action,
  };
};
