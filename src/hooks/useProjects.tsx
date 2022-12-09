import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { works } from '../data';
import { fs } from '../firebase';
import { IProject } from '../types';
import { getErrorMsg } from '../utils';
import { useTypedSelector } from './redux';
import { useActions } from './useActions';

const useProjects = () => {
  const { action } = useActions();
  const { currentUser } = useTypedSelector(state => state.auth);
  const { floor, meter } = useTypedSelector(state => state.quiz);
  const { total } = useTypedSelector(state => state.works);
  const { currency, workCurrency } = useTypedSelector(state => state.exchangeRate);
  const [error, setError] = useState<string | null>(null);

  const onGetProjects = async (): Promise<void> => {
    try {
      if (!currentUser) return;

      // action.setIsLoading(true);
      const projects: IProject[] = [];

      const q = query(collection(fs, 'projects'), where('authorUid', '==', currentUser?.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        projects.push({ ...doc.data(), id: doc.id } as IProject);
      });

      action.setProjects(projects);
    } catch (error) {
      console.log(error);
    } finally {
      // action.setIsLoading(false);
    }
  };

  const onDeleteProject = async (id: string): Promise<void> => {
    try {
      action.setIsLoading(true);
      await deleteDoc(doc(fs, 'projects', id));
      action.deleteProject(id);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onGetError = (name: string, workId: number): boolean => {
    if (name && !!+workId) {
      if (works.length < +workId) {
        setError('Максимальное значение ' + works.length);
        return false;
      }
      return true;
    } else {
      throw new Error('invalid value');
    }
  };

  const onAddProject = async (name: string, workId: number): Promise<void> => {
    if (!currentUser || !currency) return;
    try {
      action.setIsLoading(true);

      const isValid = onGetError(name, workId);

      action.calcTotalProjectInfo({
        currency,
        workCurrency,
        order: workId,
        info: { floor: '' + floor, meter: '' + meter },
      });

      if (isValid && total) {
        const newProject: IProject = {
          id: `${currentUser.uid}/${name}/${Math.random()}`,
          authorUid: currentUser.uid,
          workId,
          name,
          isDone: works.length === workId,
          createdAt: Date.now(),
          answers: null,
          price: total.price,
          time: total.time,
          info: { floor: '' + floor, meter: '' + meter },
          currency: currency.Cur_Abbreviation,
        };

        const project = await addDoc(collection(fs, 'projects'), newProject);
        action.addProject({ ...newProject, id: project.id });
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError(getErrorMsg(error));
    } finally {
      action.setIsLoading(false);
    }
  };

  const onUpdateProject = async (project: IProject) => {
    if (+project.workId > works.length) {
      setError('Максимумальное значение работ: ' + works.length);
      return;
    }
    if (!project.workId) {
      setError('Не указан номер работы');
      return;
    }

    try {
      action.setIsLoading(true);

      const projectsRef = doc(fs, 'projects', project.id);
      await updateDoc(projectsRef, { ...project });
      action.updateProject(project);
    } catch (error) {
      console.error(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  return {
    onGetProjects,
    onAddProject,
    onDeleteProject,
    onUpdateProject,
    error,
    setError,
  };
};

export default useProjects;
