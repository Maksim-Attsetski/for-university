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
  const [projectName, setProjectName] = useState<string>('');
  const { onAddProject, error, setError } = useProjects();

  return (
    <>
      <Toast data={error} setData={setError} isError />
      <Popup isShow={isShow} setIsShow={setIsShow}>
        <div>
          <Title text="Форма создания проекта" />

          <div className="my-4">
            <Input
              text={projectName}
              maxLength={25}
              setText={setProjectName}
              placeholder="Название"
              className="w-full"
            />
          </div>

          <div className="flex gap-2 justify-between">
            <Button
              text="Создать"
              onClick={() => {
                onAddProject(projectName, 1);
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
