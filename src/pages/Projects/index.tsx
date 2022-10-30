import { FC, useEffect } from 'react';

import { useTypedSelector } from '../../hooks/redux';

import { Button, Title } from '../../components';
import './Projects.module.scss';
import useProjects from '../../hooks/useProjects';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);
  const { onAddProject, onDeleteProject, onGetProjects } = useProjects();

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
        <div className='flex gap-4 flex-wrap justify-around items-start my-4'>
          {projects.map(({ isDone, name, id }) => (
            <div className='border-[1px] border-slate-600 border-solid p-4 rounded-2xl bg-slate-300' key={id}>
              <div>Названиe проекта: {name}</div>
              <div className={`${isDone ? 'bg-green-500' : 'bg-red-500'} text-white w-max py-1 px-2 rounded-md my-2`}>
                Готов: {isDone ? 'Да' : 'Нет'}
              </div>
              <Button text='Удалить проект' onClick={() => onDeleteProject(id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
