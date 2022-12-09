/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import s from './Projects.module.scss';

import moment from 'moment';
import { useTypedSelector } from '../../hooks/redux';
import useProjects from '../../hooks/useProjects';

import { Button, Title, Toast } from '../../components';
import { IProject } from '../../types';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { CreateProjectModal } from '../../components/modals';
import { getWorkTime } from '../../utils/getWorkTime';
import { images } from '../../assets';
import useGetWorkInfo from '../../hooks/useGetWorkInfo';
import { routes } from '../../data';

const Projects: FC = () => {
  const { works } = useTypedSelector(state => state.works);
  const { currentUser } = useTypedSelector(state => state.auth);
  const { floor, meter } = useTypedSelector(state => state.quiz);
  const { projects, materialsPrice } = useTypedSelector(state => state.projects);
  const [activeWork, setActiveWork] = useState<string | null>(null);

  const { isShow, setIsShow } = useOutsideMenu();
  const { onDeleteProject, onGetProjects, onUpdateProject, error, setError } = useProjects();
  const { calcWorkInfo } = useGetWorkInfo();

  const onWorkEnd = (project: IProject): void => {
    const workId = project.workId + 1;
    const isDone = workId === works.length;
    const materialsPrice = Math.round(project.materialsPrice * (workId / works.length));

    const total = calcWorkInfo(workId, project.info);
    const newProject = { id: project.id, workId, isDone, materialsPrice } as IProject;

    onUpdateProject(total ? { ...newProject, ...total } : newProject);
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <div className={s.projectPage}>
      <div className="container">
        <Title text="Мои проекты" className={s.title} />
        {!materialsPrice && (
          <div>
            <div className={s.title}>Чтобы создать проект, сначала пройдите викторину "Строительство с нуля"</div>
            <Button text="Викторины" to={routes.quiz} />
          </div>
        )}

        <Button
          text="Создать новый проект"
          disabled={Object.keys(projects).length >= 3 || floor <= 0 || meter <= 0 || !materialsPrice}
          onClick={() => setIsShow(true)}
        />

        <div className={s.projectList}>
          {!!Object.keys(projects).length ? (
            Object.values(projects).map(project => (
              <div
                onClick={() => setActiveWork(project.id)}
                className={`${s.project} ${activeWork === project.id ? s.active : ''}`}
                key={project.id}>
                <img src={images.projectHomeIcon} className={s.projectHomeIcon} alt="projectHomeIcon" />
                <div className={s.content}>
                  <div className="flex gap-5 items-center justify-between">
                    <div className="italic">{moment(project.createdAt).fromNow()}</div>
                    <div className={`${project.isDone ? 'bg-green-500' : 'bg-red-500'} ${s.projectState}`}>
                      Готов: {project.isDone ? 'Да' : 'Нет'}
                    </div>
                  </div>

                  <div className="max-w-xs">Названиe проекта: {project.name}</div>
                  <div>Текущая работа: {project.workId}</div>
                  <div>
                    Price: {(project.price + project.materialsPrice).toFixed(3)} {project.currency}
                  </div>
                  <div>
                    <div>Additional info:</div>
                    {project.info.floor} floor, {project.info.meter} meter
                  </div>
                  <div>time: {getWorkTime({ time: project.time, price: 1 })}</div>

                  <div className={s.buttonsContainer}>
                    {/* <Button text="Редактировать" onClick={() => setIsShow(true)} /> */}
                    <Button isDanger text="Удалить" onClick={() => onDeleteProject(project.id)} />
                    {!project.isDone && <Button text="Следующая работа" onClick={() => onWorkEnd(project)} />}
                  </div>
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
