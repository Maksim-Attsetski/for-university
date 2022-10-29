import { FC, useEffect } from 'react';

import { useTypedSelector } from '../../hooks/redux';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { fs } from '../../firebase';

import { IProject } from '../../types';

import { Button, Title } from '../../components';
import './Projects.module.scss';
import { useActions } from '../../hooks/useActions';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);
  const { action } = useActions();

  const onAddProject = async (): Promise<void> => {
    if (!currentUser) return;
    try {
      action.setIsLoading(true);
      const name = prompt();

      if (!name) return;

      const newProject: IProject = {
        id: `${currentUser.uid}/${name}/${Math.random()}`,
        userUid: currentUser.uid,
        workId: 1,
        name,
        isDone: false,
      };

      await addDoc(collection(fs, 'projects'), newProject);
      action.addProject(newProject);
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onGetProjects = async () => {
    try {
      action.setIsLoading(true);
      let projects: IProject[] = [];

      const q = query(collection(fs, 'projects'), where('userUid', '==', currentUser?.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        projects.push({ ...doc.data(), id: doc.id } as IProject);
      });

      action.setProjects(projects);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onDeleteProject = async (id: string) => {
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

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <div>
      <div className='container'>
        <br />
        <Title text='Мои проекты' />
        <br />
        <Button text='Создать проект +' onClick={onAddProject} />
        <div className='flex gap-4 justify-around items-start my-4'>
          {projects.map(({ isDone, name, id }) => (
            <div className='border-[1px] border-slate-600 border-solid p-4 rounded-2xl bg-slate-300' key={id}>
              <div>Названик проекта: {name}</div>
              <div>Готов: {isDone ? 'Да' : 'Нет'}</div>
              <br />
              <Button text='Удалить проект' onClick={() => onDeleteProject(id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
