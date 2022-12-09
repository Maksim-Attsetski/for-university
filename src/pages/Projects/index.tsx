/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import s from './Projects.module.scss';

import moment from 'moment';
import { useTypedSelector } from '../../hooks/redux';
import useProjects from '../../hooks/useProjects';
import useOutsideMenu from '../../hooks/useOutsideMenu';

import { Button, Title, Toast } from '../../components';
import { ChangeWorkModal, CreateProjectModal } from '../../components/modals';
import { getWorkTime } from '../../utils/getWorkTime';
import { images } from '../../assets';
import { routes } from '../../data';
import { IProject } from '../../types';

type IModalType = 'prev' | 'next' | 'end';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { floor, meter } = useTypedSelector(state => state.quiz);
  const { projects, materialsPrice } = useTypedSelector(state => state.projects);
  const [activeWork, setActiveWork] = useState<IProject | null>(null);

  const { isShow, setIsShow } = useOutsideMenu();
  const [modalType, setModalType] = useState<IModalType>('next');
  const { isShow: workModalShown, setIsShow: setWorkModalShown } = useOutsideMenu();
  // const { isShow: nextShow, setIsShow: setNextShow } = useOutsideMenu();
  const { onDeleteProject, onGetProjects, error, setError } = useProjects();

  const onModalOpen = (type: IModalType) => {
    setModalType(type);
    setWorkModalShown(true);
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
                onClick={() => setActiveWork(project)}
                className={`${s.project} ${activeWork?.id === project.id ? s.active : ''}`}
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
                    {!project.isDone && project.workId !== 1 && (
                      <Button text="Предыдущая работа" onClick={() => onModalOpen('prev')} />
                    )}
                    {!project.isDone && <Button text="Следующая работа" onClick={() => onModalOpen('next')} />}
                    {!project.isDone && <Button text="Завершить" onClick={() => onModalOpen('end')} />}
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
      <ChangeWorkModal
        isShow={workModalShown}
        setIsShow={setWorkModalShown}
        project={activeWork}
        modalType={modalType}
      />
    </div>
  );
};
export default Projects;
