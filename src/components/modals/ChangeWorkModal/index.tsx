import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/redux';
import useGetWorkInfo from '../../../hooks/useGetWorkInfo';
import useProjects from '../../../hooks/useProjects';
import { IProject } from '../../../types';
import Button from '../../Button';
import Popup from '../../Popup';
import Title from '../../Title';

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
  project: IProject | null;
  modalType: 'prev' | 'next' | 'end';
}

const ChangeWorkModal: FC<IProps> = ({ isShow, setIsShow, modalType, project }) => {
  const { calcWorkInfo } = useGetWorkInfo();
  const { onUpdateProject } = useProjects();
  const { works } = useTypedSelector(state => state.works);

  const onWorkChange = (): void => {
    if (!project) {
      return;
    }

    const workId = modalType === 'end' ? works.length : modalType === 'prev' ? project.workId - 1 : project.workId + 1;
    const isDone = workId === works.length;
    const materialsPrice = Math.round(project.materialsPrice * (workId / works.length));

    const total = calcWorkInfo(workId, project.info);
    const newProject = { id: project.id, workId, isDone, materialsPrice } as IProject;

    setIsShow(false);
    onUpdateProject(total ? { ...newProject, ...total } : newProject);
  };

  return (
    <>
      <Popup isShow={isShow} setIsShow={setIsShow}>
        <Title text={`Вы уверены, что хотите ${modalType === 'end' ? 'завершить проект' : 'сменить работу'}?`} />

        <br />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button text="Отмена" onClick={() => setIsShow(false)} />
          <Button text={'Да'} onClick={onWorkChange} />
        </div>
      </Popup>
    </>
  );
};

export default ChangeWorkModal;
