import { FC, useEffect } from 'react';

import { useTypedSelector } from '../../hooks/redux';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { fs } from '../../firebase';

import { IProject } from '../../types';

import { Button, Title } from '../../components';
import './Projects.module.scss';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const onAddProject = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      const newProject: IProject = {
        userUid: currentUser.uid,
        workId: 1,
        name: prompt() || 'Без названия',
        isDone: false,
      };

      await addDoc(collection(fs, 'projects'), newProject);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onGetProjects = async () => {
    let projects: IProject[] = [];
    const q = query(collection(fs, 'projects'), where('userUid', '==', currentUser?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      projects.push(doc.data() as IProject);
    });

    console.log(projects);
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <div>
      <div className='container'>
        <Title text='Мои проекты' />
        <br />
        <div>
          <Button text='Создать проект +' onClick={onAddProject} />
        </div>
      </div>
    </div>
  );
};
export default Projects;
