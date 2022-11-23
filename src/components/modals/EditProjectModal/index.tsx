import React, { FC, useState } from 'react';
import { works } from '../../../data';
import useProjects from '../../../hooks/useProjects';
import { IProject } from '../../../types';

import Button from '../../Button';
import Input from '../../Input';
import Popup from '../../Popup';
import Title from '../../Title';

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
}

const EditProjectModal: FC<IProps> = ({ isShow, setIsShow }) => {
  const [projectInfo, setProjectInfo] = useState<{ name: string; workId: string }>({
    name: '',
    workId: '',
  });
  const { onUpdateProject } = useProjects();

  const onChangeProjectWork = (project: IProject): void => {
    const newProject: IProject = {
      ...project,
      isDone: works.length === +projectInfo.workId,
      workId: +projectInfo.workId,
      name: projectInfo.name,
    };

    onUpdateProject(newProject);
  };

  return (
    <Popup isShow={isShow} setIsShow={setIsShow}>
      <div>
        <Title text="Форма редактировния проекта" />

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
            text="Сохранить"
            onClick={() => {
              onChangeProjectWork({} as IProject);
              setIsShow(false);
            }}
          />
          <Button text="Отмена" isSecondary onClick={() => setIsShow(false)} />
        </div>
      </div>
    </Popup>
  );
};

export default EditProjectModal;
