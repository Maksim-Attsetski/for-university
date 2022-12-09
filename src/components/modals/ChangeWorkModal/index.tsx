import React, { FC } from 'react';
import Button from '../../Button';
import Popup from '../../Popup';
import Title from '../../Title';

interface IProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
}

const ChangeWorkModal: FC<IProps> = ({ isShow, setIsShow }) => {
  return (
    <>
      <Popup isShow={isShow} setIsShow={setIsShow}>
        <Title text="Вы уверены, что хотите сменить работу?" />

        <br />
        <Button text="Отмена" onClick={() => setIsShow(false)} />
      </Popup>
    </>
  );
};

export default ChangeWorkModal;
