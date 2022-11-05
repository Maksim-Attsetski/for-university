/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import s from './Projects.module.scss';

import moment from 'moment';
import { useTypedSelector } from '../../hooks/redux';
import useProjects from '../../hooks/useProjects';

import { Button, Input, Popup, Title, Toast } from '../../components';
import { IProject } from '../../types';
import { works } from '../../data';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);
  const { onAddProject, onDeleteProject, onGetProjects, onUpdateProject, error, setError } =
    useProjects();
  const [projectInfo, setProjectInfo] = useState<{ name: string; workId: string }>({
    name: '',
    workId: '',
  });

  const onProjectEnd = (project: IProject): void => {
    const newProject = { id: project.id, isDone: true, workId: works.length } as IProject;
    onUpdateProject(newProject);
  };

  const onChangeProjectWork = (project: IProject): void => {
    if (projectInfo.workId && +projectInfo.workId < works.length) {
      const isDone = works.length === +projectInfo.workId;

      const newProject = {
        ...project,
        id: project.id,
        isDone,
        workId: +projectInfo.workId,
      } as IProject;

      onUpdateProject(newProject);
    }
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  const getProjectForm = (isEdit: boolean = false, project: IProject) => (
    <Popup
      buttonText={isEdit ? 'Редактировать' : 'Создать проект +'}
      renderBody={setIsShow => {
        return (
          <div>
            <Title text={`Форма ${isEdit ? 'редактировния' : 'создания'} проекта`} />

            <div className="my-4">
              <Input
                text={projectInfo.name}
                setText={name => setProjectInfo({ ...projectInfo, name })}
                placeholder="Название"
                className="w-full"
              />
              <br />
              <Input
                text={projectInfo.workId}
                setText={workId => setProjectInfo({ ...projectInfo, workId })}
                placeholder="Номер работы"
                className="w-full"
              />
            </div>

            <div className="flex gap-2 justify-between">
              <Button
                text={isEdit ? 'Сохранить' : 'Создать'}
                onClick={() => {
                  isEdit
                    ? onChangeProjectWork(project)
                    : onAddProject(projectInfo.name, +projectInfo.workId);
                  setIsShow(false);
                }}
              />
              <Button text="Отмена" isSecondary onClick={() => setIsShow(false)} />
            </div>
          </div>
        );
      }}
    />
  );

  return (
    <div>
      <div className="container">
        <Title text="Мои проекты" className="my-4" />
        {getProjectForm(false, {} as IProject)}
        <Toast isError data={error} setData={setError} />

        <div className={s.projectList}>
          {!!projects.length ? (
            projects.map(project => (
              <div className={s.project} key={project.id}>
                <div className="flex gap-5 items-center justify-between">
                  <div className="italic">{moment(project.createdAt).fromNow()}</div>
                  <div
                    className={`${project.isDone ? 'bg-green-500' : 'bg-red-500'} ${
                      s.projectState
                    }`}>
                    Готов: {project.isDone ? 'Да' : 'Нет'}
                  </div>
                </div>

                <div className="max-w-xs">Названиe проекта: {project.name}</div>
                <div>Текущая работа: {project.workId}</div>
                <div className="my-4">{getProjectForm(true, project)}</div>

                <div className={s.buttonsContainer}>
                  <Button isDanger text="Удалить" onClick={() => onDeleteProject(project.id)} />
                  {!project.isDone && (
                    <Button text="Завершить" onClick={() => onProjectEnd(project)} />
                  )}
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
    </div>
  );
};
export default Projects;
