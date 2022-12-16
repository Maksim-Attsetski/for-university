/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react';
import s from './Projects.module.scss';

import { useTypedSelector } from '../../hooks/redux';
import useProjects from '../../hooks/useProjects';
import useOutsideMenu from '../../hooks/useOutsideMenu';

import { Arrows, Button, Title, Toast } from '../../components';
import { ChangeWorkModal, CreateProjectModal } from '../../components/modals';
import { getWorkTime } from '../../utils/getWorkTime';
import { images } from '../../assets';
import { routes } from '../../data';
import { IProject } from '../../types';

type IModalType = 'prev' | 'next' | 'end';

const Projects: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { floor, meter } = useTypedSelector(state => state.quiz);
  const { projects, materialsPrice, limit } = useTypedSelector(state => state.projects);
  const [activeWork, setActiveWork] = useState<IProject | null>(null);

  const { isShow, setIsShow } = useOutsideMenu();
  const [modalType, setModalType] = useState<IModalType>('next');
  const { isShow: workModalShown, setIsShow: setWorkModalShown } = useOutsideMenu();
  // const { isShow: nextShow, setIsShow: setNextShow } = useOutsideMenu();
  const { onDeleteProject, onGetProjects, error, setError } = useProjects();

  const projectCount = useMemo(() => Object.keys(projects), [projects]);
  const addButtonDisable = useMemo(
    () => projectCount.length >= limit || floor <= 0 || meter <= 0 || !materialsPrice,
    [projectCount, floor, meter, materialsPrice],
  );

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
        <br />
        <Title text="Мои проекты" className={s.title} />
        {addButtonDisable && <Button text="Викторины" to={routes.quiz} className="mb-3" />}

        <div className={s.projectList}>
          <div
            className={[s.project, s.addButtons].join(' ')}
            onClick={() => (addButtonDisable ? {} : setIsShow(true))}
            title={addButtonDisable ? 'Надо бы викторину пройти' : 'Тыкни, чтобы создать проект'}
            data-disabled={addButtonDisable}>
            <div className={s.projectCount}>
              {projectCount.length} / {limit}
            </div>
            <img src={images.plus} className={s.plus} alt="projectHomeIcon" />
          </div>

          {!!projectCount.length ? (
            Object.values(projects).map(project => (
              <div
                onClick={() => setActiveWork(project)}
                className={`${s.project} ${activeWork?.id === project.id ? s.active : ''}`}
                key={project.id}>
                <img src={images.projectHomeIcon} className={s.projectHomeIcon} alt="projectHomeIcon" />
                <div className={s.content}>
                  <div className={s.title}>{project.name}</div>
                  {project.isDone ? (
                    <div>Проект завершен</div>
                  ) : (
                    <>
                      <div>Текущая работа: {project.workId}</div>
                      <div>
                        Цена: {(project.price + project.materialsPrice).toFixed(3)} {project.currency}
                      </div>
                      <div>Время: {getWorkTime({ time: project.time, price: 1 })}</div>
                    </>
                  )}
                  <div className="flex justify-between gap-3">
                    <div>Этажи: {project.info.floor}</div>
                    <div>Метры: {project.info.meter}</div>
                  </div>
                </div>
                <div className={s.buttonsContainer}>
                  <Arrows
                    leftDisable={project.workId <= 1}
                    onLeftClick={project.workId <= 1 ? () => {} : () => onModalOpen('prev')}
                    order={project.workId}
                    lenght={34}
                    rightDisable={project.isDone}
                    onRightClick={project.isDone ? () => {} : () => onModalOpen('next')}
                  />
                  <div className={s.flexs}>
                    <Button isDanger text="Удалить" className="mr-4" onClick={() => onDeleteProject(project.id)} />
                    {!project.isDone && <Button text="Завершить" onClick={() => onModalOpen('end')} />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={[s.project, s.addButtons, s.noData].join(' ')}>
              <Title text="У вас нет проектов" className={s.title} />
              <p>
                Чтобы начать работу с калькулятором, нажмите на главной странице кнопку «рассчитать». Выберите и
                пройдите анкету соответствующую вашим запросами и получите результат.
                <br />
                <br />
                Сохранив его в свои проекты Вы сможете отслеживать процесс в режиме реального времени и следить за
                расходом денежных средств.
              </p>
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
