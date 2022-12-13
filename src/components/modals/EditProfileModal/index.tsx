import React, { FC, useState } from 'react';

import Button from '../../Button';
import Input from '../../Input';
import Popup from '../../Popup';
import Title from '../../Title';

import s from './EditProfileModal.module.scss';

interface IEditItems {
  name: string;
  pass: string;
}

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
  onSaveEdition: (editItems: IEditItems) => Promise<void>;
}

const EditProfileModal: FC<IProps> = ({ isShow, onSaveEdition, setIsShow }) => {
  const [editItems, setEditItems] = useState<IEditItems>({ name: '', pass: '' });

  return (
    <Popup isShow={isShow} setIsShow={setIsShow}>
      <>
        <Title text="Изменяйте что угодно" className="text-center" />
        <br />
        <div className={s.content}>
          <div className="w-full">
            <div className="mb-2">Обновить имя</div>
            <Input
              className="w-full"
              text={editItems.name}
              placeholder={'Имя'}
              setText={name => setEditItems({ ...editItems, name })}
            />
          </div>
          <div className="w-full">
            <div className="mb-2">Обновить пароль</div>
            <Input
              className="w-full"
              text={editItems.pass}
              placeholder={'Пароль'}
              setText={pass => setEditItems({ ...editItems, pass })}
            />
          </div>
        </div>
        <div className={s.profileBtns}>
          <Button
            text="Сохранить"
            className="mr-3"
            onClick={async () => {
              await onSaveEdition(editItems);
              setIsShow(false);
              setEditItems({ name: '', pass: '' });
            }}
          />
          <Button
            isSecondary
            text="Отмена"
            onClick={() => {
              setEditItems({ name: '', pass: '' });
              setIsShow(false);
            }}
          />
        </div>
      </>
    </Popup>
  );
};

export default EditProfileModal;
