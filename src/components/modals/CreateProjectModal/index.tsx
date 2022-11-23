import React, { FC, useState } from 'react';

import useProjects from '../../../hooks/useProjects';

import Button from '../../Button';
import Input from '../../Input';
import Popup from '../../Popup';
import Title from '../../Title';
import Toast from '../../Toast';

// import s from './CreateProjectModal.module.scss';

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
}

const CreateProjectModal: FC<IProps> = ({ isShow, setIsShow }) => {
  const [projectInfo, setProjectInfo] = useState<{ name: string; workId: string }>({
    name: '',
    workId: '',
  });
  const { onAddProject, error, setError } = useProjects();

  return (
    <>
      <Toast data={error} setData={setError} isError />
      <Popup isShow={isShow} setIsShow={setIsShow}>
        <div>
          <Title text="Форма создания проекта" />

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
              text="Создать"
              onClick={() => {
                onAddProject(projectInfo.name, +projectInfo.workId);
                setIsShow(false);
              }}
            />
            <Button text="Отмена" isSecondary onClick={() => setIsShow(false)} />
          </div>
        </div>
      </Popup>
    </>
  );
};

export default CreateProjectModal;
