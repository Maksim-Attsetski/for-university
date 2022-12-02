import React, { FC } from 'react';
import Button from '../../Button';
import Popup from '../../Popup';
import Title from '../../Title';

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
  onDeleteAccount: () => Promise<void>;
}

const DeleteProfileModal: FC<IProps> = ({ isShow, onDeleteAccount, setIsShow }) => {
  return (
    <Popup isShow={isShow} setIsShow={setIsShow}>
      <>
        <Title text="Вы уверены что хотите удалить свой аккаунт?" />
        <br />
        <Button
          text="Да"
          className="mr-3"
          onClick={async () => {
            await onDeleteAccount();
            setIsShow(false);
          }}
        />
        <Button isSecondary text="Нет" className="mr-3" onClick={() => setIsShow(false)} />
      </>
    </Popup>
  );
};

export default DeleteProfileModal;
