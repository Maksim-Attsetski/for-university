/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import s from './Projects.module.scss';

import moment from 'moment';
import { useTypedSelector } from '../../hooks/redux';
import useProjects from '../../hooks/useProjects';

import { Button, Title, Toast } from '../../components';
import { IProject } from '../../types';
import { works } from '../../data';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { CreateProjectModal } from '../../components/modals';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);
  const { onDeleteProject, onGetProjects, onUpdateProject, error, setError } = useProjects();
  const { isShow, setIsShow } = useOutsideMenu();

  const onProjectEnd = (project: IProject): void => {
    const newProject = { id: project.id, isDone: true, workId: works.length } as IProject;
    onUpdateProject(newProject);
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <div>
      <div className="container">
        <Title text="Мои проекты" className="my-4" />
        <Button text="Создать новый проект" onClick={() => setIsShow(true)} />

        <div className={s.projectList}>
          {!!projects.length ? (
            projects.map(project => (
              <div className={s.project} key={project.id}>
                <div className="flex gap-5 items-center justify-between">
                  <div className="italic">{moment(project.createdAt).fromNow()}</div>
                  <div className={`${project.isDone ? 'bg-green-500' : 'bg-red-500'} ${s.projectState}`}>
                    Готов: {project.isDone ? 'Да' : 'Нет'}
                  </div>
                </div>

                <div className="max-w-xs">Названиe проекта: {project.name}</div>
                <div>Текущая работа: {project.workId}</div>

                <div className={s.buttonsContainer}>
                  {/* <Button text="Редактировать" onClick={() => setIsShow(true)} /> */}
                  <Button isDanger text="Удалить" onClick={() => onDeleteProject(project.id)} />
                  {!project.isDone && <Button text="Завершить" onClick={() => onProjectEnd(project)} />}
                </div>
              </div>
            ))
          ) : (
            <div>
              <Title text="У вас еще нет проектов" />
            </div>
          )}
        </div>
      </div>

      <Toast isError data={error} setData={setError} />
      <CreateProjectModal isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
};
export default Projects;
